import styled, { CSSObject } from "@emotion/styled";

const Label = styled.label<{ sx?: CSSObject }>`
  display: flex;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #253858;
  span {
    margin-left: 4px;
  }
  ${({ sx }) => sx};
`;

interface InputLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  sx?: CSSObject;
  children: React.ReactNode;
}

const InputLabel = ({ sx, children, ...restProps }: InputLabelProps) => {
  if (!children) return null;

  return (
    <Label sx={sx} {...restProps}>
      {children}
    </Label>
  );
};

export default InputLabel;
