import React, { MouseEventHandler, PointerEvent, type ReactNode } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
  type Icon,
} from "react-feather";

import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT: Record<string, Icon> = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

export interface ToastProps {
  id: string;
  variant: string;
  children: ReactNode | ReactNode[];
}

function Toast({
  id,
  variant,
  children,
  handleClick,
}: ToastProps & { handleClick: (id: string) => void }) {
  const IconElement = ICONS_BY_VARIANT[variant];

  function handleToastClick(event: PointerEvent<HTMLButtonElement>): void {
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
