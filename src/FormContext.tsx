import React, { createContext, useContext, useMemo } from 'react';
import { useForm } from './useForm';
import { FormEffect } from './FormEffect';
import { FormContextType, FormProviderProps } from './types';

const FormContext = createContext<FormContextType>({
  values: {},
  errors: {},
  touched: {},
  handleChange: () => () => {},
  handleTouched: () => () => {},
  handleError: () => () => {},
  setValues: () => {},
  setErrors: () => {},
  setTouched: () => {},
  validateForm: () => new Promise(() => {}),
});

/**
 * @component **FormProvider**
 * @description Component to render form in the context of **FormContext**
 * @example
 * <FormProvider
 *  onSubmit={(values) => {
 *   console.log(values);
 *  }}
 * >
 *  <FastField
 *   name="firstName"
 *   component="text"
 *  />
 * </FormProvider>
 */
export const FormProvider = <T extends Record<string, any>>({
  initialValues,
  validateOnMount = false,
  validateOnChange = false,
  handleFormValueChange,
  validations,
  onSubmit,
  children,
}: FormProviderProps<T>): JSX.Element => {
  const {
    values,
    errors,
    touched,
    isValid,
    handleChange,
    handleSubmit,
    handleTouched,
    handleError,
    setValues,
    setErrors,
    setTouched,
    validateForm,
  } = useForm<T>({
    validateOnMount,
    validateOnChange,
    initialValues: initialValues as T,
    validations,
    onSubmit,
  });

  const value = {
    values,
    errors,
    touched,
    handleChange,
    handleTouched,
    handleError,
    setValues,
    setErrors,
    setTouched,
    validateForm,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Fields = useMemo(() => children, []);

  return (
    <FormContext.Provider value={value}>
      {handleFormValueChange && (<FormEffect onChange={handleFormValueChange} />)}
      <Fields
        values={values}
        touched={touched}
        isValid={isValid}
        handleSubmit={handleSubmit}
      />
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
