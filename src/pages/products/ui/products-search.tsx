import type { FC } from "react";
import { observer } from "mobx-react";
import { MdClose, MdSearch } from "react-icons/md";
import { useProductsPageStore } from "../model";
import styles from "./products-search.module.css";

export const ProductsSearch: FC = observer(() => {
  const store = useProductsPageStore();

  return (
    <div className={styles.searchBlock}>
      <MdSearch aria-hidden="true" className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Поиск по названию"
        value={store.searchQuery}
        onChange={(e) => store.setSearchQuery(e.target.value)}
      />
      {store.searchQuery && (
        <button
          type="button"
          className={styles.searchClearButton}
          onClick={() => store.setSearchQuery("")}
          aria-label="Очистить поиск"
        >
          <MdClose aria-hidden="true" />
        </button>
      )}
    </div>
  );
});