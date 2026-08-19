import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({ children, className, type = "button", ...rest }) => {
  return (
    <button type={type} className={clsx(styles.button, className)} {...rest}>
      {children}
    </button>
  );
};
