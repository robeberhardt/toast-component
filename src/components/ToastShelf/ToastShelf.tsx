import React, { Dispatch, SetStateAction } from "react";

import Toast, { ToastProps } from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({
  toasts,
  setToasts,
}: {
  toasts: ToastProps[];
  setToasts: Dispatch<ToastProps[]>;
}) {
  React.useEffect(() => {
    const logToasts = window.setInterval(() => {
      console.log({ toasts });
    }, 1000);

    return () => {
      window.clearInterval(logToasts);
    };
  }, [toasts]);

  function handleClick(id: string): void {
    console.log(`shelf says you clicked: ${id}`);
    const nextToasts: ToastProps[] = toasts.filter((toast) => {
      return toast.id !== id;
    });
    setToasts(nextToasts);
  }

  return (
    <ol className={styles.wrapper}>
      {toasts.map(({ id, variant, children }) => (
        <li key={id} className={styles.toastWrapper}>
          <Toast id={id} variant={variant} handleClick={handleClick}>
            {children}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
