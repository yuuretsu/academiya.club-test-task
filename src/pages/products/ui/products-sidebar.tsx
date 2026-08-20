import type { FC } from "react";
import { observer } from "mobx-react";
import { useProductsPageStore, type ProductSortBy } from "../model";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Radio, type RadioOption } from "@/shared/ui/radio";
import { ProductsSearch } from "./products-search";
import styles from "./products-sidebar.module.css";

const sortOptions: RadioOption<ProductSortBy>[] = [
  { value: "default", label: "по умолчанию" },
  { value: "price-asc", label: "цена по возрастанию" },
  { value: "price-desc", label: "цена по убыванию" },
];

export const ProductsSidebar: FC = observer(() => {
  const store = useProductsPageStore();

  return (
    <aside className={styles.sidebar}>
      <ProductsSearch />
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Наличие</h3>
        <Checkbox
          checked={store.isOnlyAvailable}
          onChange={store.setIsOnlyAvailable}
          label="в наличии"
        />
      </div>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Сортировка</h3>
        <div className={styles.sortGroup}>
          <Radio
            name="sort"
            value={store.sortBy}
            options={sortOptions}
            onChange={store.setSortBy}
          />
        </div>
      </div>
      {store.hasActiveFilters && (
        <div className={styles.resetRow}>
          <Button onClick={() => store.resetFilters()}>Сбросить фильтры</Button>
        </div>
      )}
    </aside>
  );
});