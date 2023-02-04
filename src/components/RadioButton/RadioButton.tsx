import React, { PointerEvent, ReactNode, InputHTMLAttributes } from "react";

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  children: ReactNode;
  onClick?: (e: PointerEvent<HTMLInputElement>) => void;
}

function titleCase(input: string): string {
  return input?.substring(0, 1).toUpperCase() + input?.substring(1);
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked = false,
  children,
  ...delegated
}) => {
  const radioLabel: string = children?.toString() || "";
  if (!children) return null;
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
      {titleCase(children?.toString())}
    </label>
  );
};

export default RadioButton;
