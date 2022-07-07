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
  resetValues: () => {},
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
  initialTouched = false,
  enableReinitialize = false,
  onFormValueChange,
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
    resetValues,
  } = useForm<T>({
    validateOnMount,
    validateOnChange,
    initialTouched,
    enableReinitialize,
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
    resetValues,
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Fields = useMemo(() => children, []);

  return (
    <FormContext.Provider value={value}>
      {onFormValueChange && (<FormEffect onChange={onFormValueChange} />)}
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
