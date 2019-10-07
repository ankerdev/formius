import * as React from 'react';
import { Schema } from 'yup';

// @TODO Can I safely say that value is always string?
// @TODO Should I follow React's interface for defaultValue?:
// React.InputHTMLAttributes<HTMLInputElement>.value?: string | number | string[] | undefined

// @TODO Add prop to disable globalClassNames per field?
export interface ICheckboxField extends IFieldProps {
  content: React.ReactNode;
}

export interface IField extends IWithValue {
  errors: string[];
  hasFocus: boolean;
  onBlur: () => void;
  onChange: (value: any) => void;
  onFocus: () => void;
  setHasFocus: React.Dispatch<React.SetStateAction<boolean>>;
  setTouched: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<any>;
  touched: boolean;
  value: any;
}

export interface IFieldClassNames {
  errorClassName?: string;
  errorContainerClassName?: string;
  fieldContainerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
}

export interface IFieldContainerProps {
  field: IField;
  props: IFieldProps;
}

export interface IFieldOption extends IWithValue {
  label: number | string;
}

export interface IFieldProps extends IFieldClassNames, IValidationProps {
  defaultValue?: any;
  label?: string;
  name: string;
}

export interface IFieldWithOptionsProps extends IFieldProps {
  options: IFieldOption[];
}

export interface IFormContext {
  setField: (key: string, value: IFormFieldValue) => void;
  submitted: boolean;
}

export interface IFormFieldValue extends IValidationParameters {}

export interface IFormFieldValuesObject {
  [key: string]: IFormFieldValue;
}

export interface IFormProps {
  children?: React.ReactNode;
  onSubmit: ((values: any) => void | Promise<void>);
}

export interface IGlobalClassNames extends IFieldClassNames {
  formClassName?: string;
}

export interface IRadioFieldProps extends IFieldWithOptionsProps {}

export interface ISelectField extends IFieldWithOptionsProps {}

export interface ITextareaFieldProps extends ITextFieldProps {}

export interface ITextFieldProps extends IFieldProps {
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
}

export interface IValidationParameters extends IValidationProps, IWithValue {}

export interface IValidationProps {
  validationRules?: Array<(value: any) => string | null | undefined | Promise<string | null | undefined>>;
  validationSchema?: Schema<any>;
}

export interface IWithValue {
  value: any;
}
