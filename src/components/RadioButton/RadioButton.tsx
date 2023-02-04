import React, { PointerEvent, ReactNode, InputHTMLAttributes } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  children: ReactNode;
  onClick?: (e: PointerEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  children,
  ...delegated
}) => {
  const radioLabel: string = children?.toString() || "";
  return (
    <label htmlFor={`variant-${radioLabel}`}>
      <input
        id={`variant-${radioLabel}`}
        type="radio"
        name="variant"
        readOnly
        value={radioLabel}
        checked={checked}
        {...delegated}
      />
      {children}
    </label>
  );
};

export default RadioButton;
