import { ObjectSchema, Shape } from "yup";

export type FormContextType = {
  values: Record<string, any>;
  errors: Partial<Record<string, any>>;
  touched: Partial<Record<string, any>>;
  handleChange: (key: string) => (value: any) => void;
  handleTouched: (key: string) => (value: any) => void;
  handleError: (key: string) => (value: any) => void;
  setValues: (args: Partial<any>) => void;
  setErrors: (args: Partial<any>) => void;
  setTouched: (args: Partial<any>) => void;
  resetValues: (args: Partial<any>) => void;
  validateForm: (
    values: any,
    submit: (values: any, form: any) => void
  ) => Promise<void>;
};

export type Validations<T extends Record<string, any>> = ObjectSchema<
  Shape<object, T>
>;

export type FormEffectProps = {
  onChange: (args: {
    fieldName: string;
    prevValue: any;
    value: any;
    form: FormContextType;
  }) => void;
};

export type FormProviderProps<T> = {
  initialValues: T;
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  initialTouched?: boolean;
  enableReinitialize?: boolean;
  onFormValueChange?: (args: {
    fieldName: string;
    prevValue: any;
    value: any;
    form: FormContextType;
  }) => void;
  validations: Validations<T>;
  onSubmit: (values: T, form: FormContextType) => void;
  children: React.ComponentType<{
    values: T;
    touched: Partial<Record<keyof T, boolean>>;
    errors: Partial<Record<keyof T, string>>;
    isValid: boolean;
    handleSubmit: () => void;
    setValues: (value: Partial<T>) => void;
  }>;
};

export type FieldProps = {
  name: string;
};

export type FieldInputProps = {
  value?: any;
};

export type FieldMetaProps = {
  error?: string;
  touched?: false[];
};

export type FieldHelperProps = {
  setValue: (value: any) => void;
  setError: (message: string) => void;
  setTouched: (touch: boolean) => void;
};

export type Options<T> = {
  validateOnMount?: boolean;
  validateOnChange?: boolean;
  initialTouched?: boolean;
  onSubmit?: (values: T, form: FormContextType) => void;
  initialValues?: T;
  validations?: Validations<T>;
  enableReinitialize?: boolean;
};

export type ErrorRecord<T> = Partial<Record<keyof T, string>>;
export type TouchedRecord<T> = Partial<Record<keyof T, boolean>>;

export type FieldError = { errors: string[] };
export type FormErrors = { inner: { path: string; message: string }[] };

type ComponentProps = {
  error?: string;
  value: any;
  onChange?: (value: any) => void;
  onBlur?: () => void;
  [x: string]: any;
};

export interface FormFieldProps {
  component: React.ComponentType<ComponentProps>;
  name: string;
  children?: React.ReactNode;
  [x: string]: any;
}
