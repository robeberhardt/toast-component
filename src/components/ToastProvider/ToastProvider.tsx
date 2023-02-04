import React, { Dispatch, ReactNode, createContext } from "react";

export interface ToastProps {
  id?: string;
  variant: string;
  children: ReactNode | ReactNode[];
}

export const VARIANT_OPTIONS = [
  "notice",
  "warning",
  "success",
  "error",
] as const;
export type Variant = typeof VARIANT_OPTIONS[number];

type ToastContextType = {
  toasts: ToastProps[];
  setToasts: Dispatch<ToastProps[]>;
  addToast: (toast: ToastProps) => void;
  removeToast: (id: string) => void;
  removeAllToasts: () => void;
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  setToasts: (toasts: ToastProps[]) => {},
  addToast: (toast: ToastProps) => {},
  removeToast: (id: string) => {},
  removeAllToasts: () => {},
});

function ToastProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const addToast = React.useCallback(
    ({ variant, children }: ToastProps) => {
      const newToast = {
        id: crypto.randomUUID(),
        variant: `${variant}`,
        children,
      };

      setToasts([...toasts, newToast]);
    },
    [toasts, setToasts]
  );

  const removeToast = React.useCallback(
    (id: string) => {
      const nextToasts: ToastProps[] = toasts.filter((toast) => {
        return toast.id !== id;
      });
      setToasts(nextToasts);
    },
    [toasts, setToasts]
  );

  const removeAllToasts = React.useCallback(() => {
    setToasts([]);
  }, [toasts, setToasts]);

  return (
    <ToastContext.Provider
      value={{ toasts, setToasts, addToast, removeToast, removeAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
