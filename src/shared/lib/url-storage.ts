export const createUrlStorage = (keyMap: Record<string, string> = {}) => {
  const getMappedKey = (key: string) => keyMap[key] ?? key;

  return {
    getItem: (key: string): string | null => {
      const urlKey = getMappedKey(key);
      const params = new URLSearchParams(window.location.search);
      return params.get(urlKey);
    },

    setItem: (key: string, value: string): void => {
      const urlKey = getMappedKey(key);
      const params = new URLSearchParams(window.location.search);
      params.set(urlKey, value);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    },

    removeItem: (key: string): void => {
      const urlKey = getMappedKey(key);
      const params = new URLSearchParams(window.location.search);
      params.delete(urlKey);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, '', newUrl);
    },
  };
};