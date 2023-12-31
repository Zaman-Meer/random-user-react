import React, { ButtonHTMLAttributes } from "react";
import styled, { CSSObject } from "@emotion/styled";
import { RequireAtLeastOne } from "../types";

interface BaseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  sx?: CSSObject;
  children?: React.ReactNode;
}

type ButtonProps = RequireAtLeastOne<BaseButtonProps, "children" | "label">;

const StyledText = styled.span`
  font-weight: 500;
`;

const StyledButton = styled.button<BaseButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
  border-radius: 5px;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 12px 16px;
  user-select: none;
  transition: color, box-shadow, background-color 0.4s ease;

  &,
  * {
    text-decoration: none;
  }

  &:disabled,
  &.disabled {
    pointer-events: none;
  }

  &:not(:disabled):not(.disabled) {
    background-color: #605ef0;
    box-shadow: 0px 1px 3px 0px rgba(97, 94, 240, 0.4);
    color: #ffffff;

    &:hover {
      background-color: #4744ee;
      box-shadow: 0px 1px 3px 0px rgba(20, 17, 187, 0.4);
    }

    &:active {
      background-color: #4744ee;
      box-shadow: 0px 1px 3px 0px rgba(20, 17, 187, 0.4);
    }
  }

  &:disabled,
  &.disabled {
    background-color: #ebecf0;
    box-shadow: 0px 1px 3px 0px rgba(25, 25, 25, 0.1);
    color: #b3bac5;

    &.icon-button {
      background-color: #f4f5f7;
    }
  }

  .loader {
    width: 20px;
    height: 20px;
    border: 3px solid #ffffff;
    border-bottom-color: #605ef0;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: spin 1s linear infinite;
  }

  /* Safari */
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  ${({ sx }) => sx};
`;

const Button = ({
  label,
  disabled,
  loading,
  sx,
  children,
  ...restProps
}: ButtonProps) => {
  return (
    <StyledButton disabled={disabled} sx={sx} {...restProps}>
      {loading && <span className="loader" />}

      {(label || children) && (
        <StyledText className="button-text">{label || children}</StyledText>
      )}
    </StyledButton>
  );
};

export default Button;
