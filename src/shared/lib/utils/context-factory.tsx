import { createContext, useContext, type ComponentType, useState } from "react";

const NOT_INITIALIZED = Symbol("NOT_INITIALIZED");

export function createContextFactory<T>(displayName = "Context") {
  const Context = createContext<T | typeof NOT_INITIALIZED>(NOT_INITIALIZED);
  Context.displayName = displayName;

  const useSafeContext = (): T => {
    const value = useContext(Context);
    if (value === NOT_INITIALIZED) {
      throw new Error(`[Context Error]: Hook must be used within its Provider`);
    }
    return value as T;
  };

  const withProvider = <P extends object,>(storeFactory: (props: P) => T) => { // TypeScript выведет P из компонента
    return function (
      Component: ComponentType<P>
    ) {
      return function WithStoreProviderComponent(props: P) {
        const [storeInstance] = useState(() => storeFactory(props));

        return (
          <Context.Provider value={storeInstance}>
            <Component {...props} />
          </Context.Provider>
        );
      };
    };
  };

  return {
    Provider: Context.Provider,
    useContext: useSafeContext,
    withProvider,
  };
}