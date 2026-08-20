import type { ButtonHTMLAttributes, FC, ReactNode } from "react";
import clsx from "clsx";
import styles from "./button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "icon";
}

export const Button: FC<ButtonProps> = ({ children, className, type = "button", variant = "default", ...rest }) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, { [styles.iconButton]: variant === "icon" }, className)}
      {...rest}
    >
      {children}
    </button>
  );
};
