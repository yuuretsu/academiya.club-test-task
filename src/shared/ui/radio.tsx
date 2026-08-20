import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./radio.module.css";

export interface RadioOption<T extends string> {
  value: T;
  label: ReactNode;
}

interface RadioProps<T extends string> {
  name: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  className?: string;
}

export const Radio = <T extends string>({
  name,
  value,
  options,
  onChange,
  className,
}: RadioProps<T>) => {
  return (
    <>
      {options.map((option) => (
        <label key={option.value} className={clsx(styles.option, className)}>
          <input
            className={styles.input}
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => e.target.checked && onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </>
  );
};