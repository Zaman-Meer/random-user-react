import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import HelperText from "./HelperText";
import { ReactComponent as CheckIcon } from "../assets/icons/check.svg";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  label: string;
  hasError?: boolean;
  helperText?: string;
  sx?: CSSObject;
}

const CheckboxContainer = styled.div<{ sx?: CSSObject }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  & > input {
    display: none;

    & + .checkbox > .box > .tick {
      margin-top: 1px;
    }

    &:checked + .checkbox > .box {
      background-color: #605ef0;
      border-color: transparent;

      & > .tick {
        opacity: 1;
      }
    }

    &:not(:checked) + .checkbox.danger > p {
      color: #ff5630;
    }

    &:disabled + .checkbox {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  ${({ sx }) => sx}
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledCheckBox = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  &.danger > .box {
    border-color: #ff5630;
  }
`;

const LabelText = styled.p`
  color: #253858;
  font-size: 14px;
  line-height: 24px;
  font-weight: 400;
  margin: 0;
  word-wrap: break-word;
`;

const StyledBox = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid #dfe1e6;
  color: #ffffff;
  background-color: #ffffff;
  transition: border-color, background-color 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Checkbox = ({
  sx,
  label,
  hasError,
  helperText,
  ...restProps
}: CheckboxProps) => {
  const inputId = restProps.id || label?.toLowerCase().replace(/\s/g, "-");

  return (
    <CheckboxContainer sx={sx}>
      <StyledInput id={inputId} type="checkbox" {...restProps} />
      <StyledCheckBox
        htmlFor={inputId}
        className={`checkbox ${hasError ? "danger" : ""}`}
      >
        <StyledBox className="box">
          <CheckIcon className="tick" />
        </StyledBox>
        <LabelText>{label}</LabelText>
      </StyledCheckBox>
      <HelperText variant={hasError ? "danger" : "warning"}>
        {helperText}
      </HelperText>
    </CheckboxContainer>
  );
};

export default Checkbox;
