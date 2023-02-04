import React, { useContext } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../ToastProvider/ToastProvider";

function ToastShelf() {
  const { toasts, removeToast, removeAllToasts } = useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="assertive"
      aria-label="Notification"
    >
      {toasts.map(({ id, variant, children }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast
            id={id}
            variant={variant}
            handleClick={() => id && removeToast(id)}
          >
            {children}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
