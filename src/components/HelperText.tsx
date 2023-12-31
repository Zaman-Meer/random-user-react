import styled from "@emotion/styled";

type textVariant = "primary" | "success" | "warning" | "danger";

const variantColors: Record<textVariant, string> = {
  primary: "#253858",
  success: "#36B37F",
  warning: "#FFAA00",
  danger: "#FF5630",
};

const StyledHelperText = styled.span<{ variant: textVariant }>`
  display: block;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  color: ${(props) => variantColors[props.variant]};
  margin-top: 4px;
`;

interface HelperTextProps {
  variant?: textVariant;
  children: React.ReactNode;
}

const HelperText = ({ variant = "primary", children }: HelperTextProps) => {
  if (children)
    return <StyledHelperText variant={variant}>{children}</StyledHelperText>;
  else return null;
};

export default HelperText;
