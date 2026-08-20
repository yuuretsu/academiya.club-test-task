import type { FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./checkbox.module.css";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: ReactNode;
  className?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange, label, className }) => {
  return (
    <label className={clsx(styles.option, className)}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  );
};