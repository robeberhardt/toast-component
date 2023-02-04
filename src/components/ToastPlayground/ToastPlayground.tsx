import React, { ChangeEvent, PointerEvent } from "react";

import Button from "../Button";
import RadioButton from "../RadioButton";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["Notice", "Warning", "Success", "Error"] as const;
type Variant = typeof VARIANT_OPTIONS[number];

function ToastPlayground() {
  const [message, setMessage] = React.useState<string>("");
  const [selectedVariant, setSelectedVariant] =
    React.useState<Variant>("Notice");

  function handleMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    const { value } = event.target as HTMLTextAreaElement;
    setMessage(value);
  }
  function handleRadioClick(event: PointerEvent<HTMLInputElement>): void {
    const { value } = event.target as HTMLInputElement;
    setSelectedVariant(value as Variant);
  }
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

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
    </div>
  );
}

export default ToastPlayground;
