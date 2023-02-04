import React, {
  ChangeEvent,
  FormEvent,
  useRef,
  PointerEvent,
  useContext,
  useEffect,
} from "react";

import Button from "../Button";
import RadioButton from "../RadioButton";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import {
  ToastContext,
  VARIANT_OPTIONS,
  type Variant,
} from "../ToastProvider/ToastProvider";

function ToastPlayground() {
  const [message, setMessage] = React.useState<string>("");
  const [selectedVariant, setSelectedVariant] =
    React.useState<Variant>("notice");

  const { toasts, addToast } = useContext(ToastContext);

  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messageRef?.current?.focus();
  }, [toasts]);

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target as HTMLTextAreaElement;
    setMessage(value);
  }

  function handleRadioClick(event: PointerEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setSelectedVariant(value as Variant);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    addToast({ variant: `${selectedVariant}`, children: `${message}` });
    setMessage("");
    setSelectedVariant("notice");
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: "baseline" }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="message"
                ref={messageRef}
                value={message}
                className={styles.messageInput}
                onChange={handleMessageChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              {VARIANT_OPTIONS.map((radioLabel, index) => (
                <RadioButton
                  key={index}
                  checked={radioLabel === selectedVariant}
                  onClick={handleRadioClick}
                >
                  {radioLabel}
                </RadioButton>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label} />
            <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
              <Button>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
