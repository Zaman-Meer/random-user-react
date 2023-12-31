import React, { InputHTMLAttributes } from "react";
import { css, CSSObject } from "@emotion/react";
import InputLabel from "./InputLabel";
import styled from "@emotion/styled";

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "style"> {
  variant?: "outlined" | "standard";
  colorType?: "primary" | "secondary" | "danger" | "warning";
  label?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  sx?: CSSObject;
}

const getBorderColor = (
  colorType: "primary" | "secondary" | "danger" | "warning" | undefined
) => {
  if (colorType) {
    switch (colorType) {
      case "primary":
        return "#605EF0";
      case "secondary":
        return "#6B778C";
      case "danger":
        return "#FF5630";
      case "warning":
        return "#FFAA00";
      default:
        return "#605EF0";
    }
  }

  return "#605EF0";
};

const StyledInput = styled.input<InputProps>`
  display: block;
  width: 100%;
  min-height: 45px;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  background-color: ${({ variant }) =>
    variant === "outlined" ? "transparent" : "#FFFFFF"};
  border: 1px solid #dfe1e6; /* Add a default border color */
  transition: border-color 0.4s ease; /* Add a transition effect for smooth color change */
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #253858;

  &:focus {
    ${({ isInvalid, colorType }) =>
      !isInvalid &&
      css`
        border-color: ${getBorderColor(
          colorType
        )}; /* Change the border color on focus only if not invalid */
      `};
  }
  ${({ disabled }) =>
    disabled &&
    css`
            background-color #EBECF0; /* Change the background color for disabled input */
            color: #A5ADBA; /* Change the text color for disabled input */
            border-color: #EBECF0; /* Change the border color for disabled input */
            cursor: not-allowed; /* Change the cursor to not-allowed for disabled input */
            opacity: 0.6; /* Reduce the opacity for disabled input */
        `}
  ${({ isInvalid }) => isInvalid && `border-color: #FF5630;`}

  ::placeholder {
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #7a869a;
  }

  /* Hide spinner arrows for number inputs */
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputWrapper = styled.div<{ sx?: CSSObject; fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ sx }) => sx};
`;

const HelperText = styled.span<{ isInvalid?: boolean }>`
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: #253858;
  margin-top: 4px;
  ${({ isInvalid }) =>
    isInvalid &&
    css`
      color: #ff5630; /* Set color to red for invalid helper text */
    `};
`;

const Input: React.FC<InputProps> = ({
  variant,
  colorType,
  label,
  isInvalid,
  fullWidth,
  helperText,
  sx,
  ...restProps
}) => {
  const inputId = restProps.id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <InputWrapper sx={sx} fullWidth={fullWidth}>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
          {restProps.required && <span aria-hidden="true"> *</span>}
        </InputLabel>
      )}
      <StyledInput
        isInvalid={isInvalid}
        id={inputId}
        colorType={colorType}
        variant={variant}
        {...restProps}
      />
      {helperText && (
        <HelperText isInvalid={isInvalid}>{helperText}</HelperText>
      )}
    </InputWrapper>
  );
};

export default Input;
