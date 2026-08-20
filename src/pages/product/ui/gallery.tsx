import type { FC } from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useProductPageStore } from "../model";
import styles from "./gallery.module.css";

export const Gallery: FC = observer(() => {
  const store = useProductPageStore();
  const { selectedColor } = store;

  return (
    <div className={styles.imagesBlock}>
      <div className={styles.mainImageWrapper}>
        {store.images.length > 1 && (
          <button
            type="button"
            className={styles.arrowLeft}
            onClick={store.prevImage}
            aria-label="Предыдущее фото"
          >
            <MdChevronLeft aria-hidden="true" />
          </button>
        )}
        {store.selectedImage ? (
          <img
            className={styles.mainImage}
            src={store.selectedImage}
            alt={selectedColor?.name ?? ""}
          />
        ) : null}
        {store.images.length > 1 && (
          <button
            type="button"
            className={styles.arrowRight}
            onClick={store.nextImage}
            aria-label="Следующее фото"
          >
            <MdChevronRight aria-hidden="true" />
          </button>
        )}
      </div>
      {store.images.length > 1 && (
        <div className={styles.thumbnails}>
          {store.images.map((image, index) => (
            <button
              key={image}
              type="button"
              className={clsx(styles.thumbnail, { [styles.thumbnailActive]: index === store.imageIndex })}
              onClick={() => store.setImageIndex(index)}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
});