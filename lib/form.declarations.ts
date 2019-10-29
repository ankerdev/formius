import * as React from 'react';
import { Schema } from 'yup';

// @TODO Can I safely say that value is always string?
// @TODO Should I follow React's interface for defaultValue?:
// React.InputHTMLAttributes<HTMLInputElement>.value?: string | number | string[] | undefined

/** Interfaces */
export interface ICheckboxField extends IFieldProps {
  content: React.ReactNode;
}

// @TODO Extend this
export interface IConfig {
  classNames: IGlobalClassNames;
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

export interface IFieldContainerProps extends IWithClassName {
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
  getFields: () => IFormFieldsObject;
  setField: (key: string, value: IFormField) => void;
  submitted: boolean;
}

export interface IFormField extends IValidationArgs {}

export interface IFormFieldsObject {
  [key: string]: IFormField;
}

// @TODO Add prop to disable globalClassNames per field?
export interface IFormProps<T> extends IWithClassName {
  children?: React.ReactNode;
  onSubmit: (values: T) => void | Promise<void>;
  onValueChange?: (values: T) => void | Promise<void>;
}

export interface IGlobalClassNames extends IFieldClassNames {
  formClassName?: string;
  checkboxFieldClassName?: string;
  selectFieldClassName?: string;
  textareaFieldClassName?: string;
  textFieldClassName?: string;
  [key: string]: string | undefined;
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

export interface IValidationArgs extends IValidationProps, IWithValue {}

export interface IValidationProps {
  validationRules?: ValidationRule[];
  validationSchema?: Schema<any>;
}

export interface IValidationRuleArgs extends IWithFields, IWithValue {}

export interface IWithClassName {
  className?: string;
}

export interface IWithFields {
  fields: IFormFieldsObject;
}

export interface IWithValue {
  value: any;
}

/** Types */
export type ValidationRule = (args: IValidationRuleArgs) => string | null | undefined | Promise<string | null | undefined>;
