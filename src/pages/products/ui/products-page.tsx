import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { ProductsPageStore } from "../model";
import { ProductCard } from "./product-card";

export const ProductsPage = observer(() => {
  const [store] = useState(() => new ProductsPageStore());
  useEffect(() => {
    store.init();
  }, [store]);

  return (
    <div style={{ display: "flex", }}>
      <div style={{ width: "16rem" }}>
        <div>
          <input type="text" placeholder="Поиск по названию" value={store.searchQuery} onChange={e => store.setSearchQuery(e.target.value)} />
          <button onClick={() => store.setSearchQuery("")}>x</button>
        </div>
        <label>
          <input type="checkbox" checked={store.isOnlyAvailable} onChange={e => store.setIsOnlyAvailable(e.target.checked)} /> в наличии
        </label>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "default"} onChange={e => e.target.checked && store.setSortBy("default")} /> по умолчанию
          </label>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "price-asc"} onChange={e => e.target.checked && store.setSortBy("price-asc")} /> цена по возрастанию
          </label>
          <label>
            <input type="radio" name="sort" checked={store.sortBy === "price-desc"} onChange={e => e.target.checked && store.setSortBy("price-desc")} /> цена по убыванию
          </label>
        </div>
      </div>
      <ul style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "1rem"
      }}>
        {store.productsListView.map(product => {
          return (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          )
        })}
      </ul>
    </div>
  )
});