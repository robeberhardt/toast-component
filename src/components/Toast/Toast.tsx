import React, { MouseEventHandler, PointerEvent, type ReactNode } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  type Icon,
} from "react-feather";
import { type ToastProps } from "../ToastProvider/ToastProvider";
import VisuallyHidden from "../VisuallyHidden";
import styles from "./Toast.module.css";

const ICONS_BY_VARIANT: Record<string, Icon> = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({
  id,
  variant,
  children,
  handleClick,
}: ToastProps & { handleClick: (id: string) => void }) {
  const IconElement = ICONS_BY_VARIANT[variant];

  function handleToastClick(event: PointerEvent<HTMLButtonElement>): void {
    if (!id) {
      throw new Error("Toast is missing ID");
    }
    console.log(`You clicked id ${id}`);
    handleClick(id);
  }

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <IconElement size={24} />
      </div>
      <p className={styles.content}>{children}</p>
      <button className={styles.closeButton} onClick={handleToastClick}>
        <X size={24} />
        <VisuallyHidden>Dismiss message</VisuallyHidden>
      </button>
    </div>
  );
}

export default Toast;
