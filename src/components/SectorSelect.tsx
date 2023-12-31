import Select from "react-select";
import { CSSObject } from "@emotion/react";
import styled from "@emotion/styled";
import HelperText from "./HelperText";
import InputLabel from "./InputLabel";
import { SubsectorType } from "../types";

export const SectorSelectWrapper = styled.div<{
  sx?: CSSObject;
  fullWidth?: boolean;
}>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ sx }) => sx};
`;

export interface SelectOptionType {
  label: string;
  value: string;
  isDisabled: boolean;
  spacing?: number;
}

interface SectorSelectProps {
  id?: string;
  name: string;
  data: SubsectorType[];
  defaultValue?: string[];
  selectedOptions: string[];
  onChange: (value: string[], name: string) => void;
  label?: string;
  placeholder?: string;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
  sx?: CSSObject;
}

const convertSubsectors = (
  subsectors: (string | SubsectorType)[],
  parentSpacing: number = 12, // &nbsp; represented as Unicode
  parentDisabled: boolean = false
): SelectOptionType[] => {
  return subsectors.reduce((options: SelectOptionType[], subsector) => {
    if (typeof subsector === "string") {
      options.push({
        label: subsector,
        value: subsector,
        isDisabled: parentDisabled,
        spacing: parentSpacing,
      });
    } else {
      const { sector, subsectors: nestedSubsectors } = subsector;
      options.push({
        label: sector, // Add spacing for sector
        value: sector,
        isDisabled: true,
        spacing: parentSpacing,
      });
      options.push(
        ...convertSubsectors(
          nestedSubsectors,
          parentSpacing + 12, // Add extra spaces for subsectors
          parentDisabled
        )
      );
    }
    return options;
  }, []);
};

const SectorSelect = ({
  id,
  name,
  data,
  defaultValue,
  selectedOptions,
  onChange,
  label,
  placeholder,
  error,
  disabled,
  helperText,
  fullWidth,
  required,
  sx,
}: SectorSelectProps) => {
  const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
  const options = convertSubsectors(data, 12, false);

  return (
    <SectorSelectWrapper fullWidth={fullWidth} sx={sx}>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </InputLabel>
      )}
      <Select
        inputId={inputId}
        isMulti
        placeholder={placeholder}
        openMenuOnFocus
        isDisabled={disabled}
        options={options}
        defaultValue={options.filter((option) =>
          defaultValue?.includes(option.value as string)
        )}
        value={options.filter((option) =>
          selectedOptions?.includes(option.value as string)
        )}
        onChange={(selOptions) => {
          const selectedValues = selOptions.map((option) => option.value);
          onChange(selectedValues as string[], name);
        }}
        getOptionValue={(option) => option.value as string}
        getOptionLabel={(option) => option.label}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: 5,
            borderWidth: 1,
            paddingTop: 4,
            paddingBottom: 4,
            outline: "none",
            boxShadow: "none",
            borderColor: error ? "#FF5630" : baseStyles.borderColor,
          }),
          option: (styles, { data }) => {
            return {
              ...styles,
              paddingLeft: `${data?.spacing}px`,
            };
          },
          multiValue: (baseStyles) => {
            return {
              ...baseStyles,
              backgroundColor: "#E8E8FD",
            };
          },
          multiValueRemove: (styles) => ({
            ...styles,
            color: "#6B778C",
            ":hover": {
              backgroundColor: "#FF5630",
              color: "white",
            },
          }),
          clearIndicator: (styles, state) => ({
            ...styles,
            color: state?.isFocused ? "#7A869A" : "#97A0AF",
          }),
          dropdownIndicator: (styles, state) => ({
            ...styles,
            color: state?.isFocused ? "#7A869A" : "#97A0AF",
          }),
          indicatorSeparator: (styles, state) => ({
            ...styles,
            color: state?.isFocused ? "#7A869A" : "#97A0AF",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: "#E8E8FD",
            primary: "#605EF0",
          },
        })}
      />
      <HelperText variant={error ? "danger" : "success"}>
        {helperText}
      </HelperText>
    </SectorSelectWrapper>
  );
};

export default SectorSelect;
