import React, { Dispatch, ReactNode, createContext, useCallback } from "react";
import useEscapeKey from "../../hooks/useEscapeKey";

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
};

export const ToastContext = createContext<ToastContextType>({
  toasts: [],
  setToasts: (toasts: ToastProps[]) => {},
  addToast: (toast: ToastProps) => {},
  removeToast: (id: string) => {},
});

function ToastProvider({ children }: { children: ReactNode | ReactNode[] }) {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscape);

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
  }, [setToasts]);

  return (
    <ToastContext.Provider value={{ toasts, setToasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
