// @ts-ignore
import React from 'react';
import {
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
} from './types';
import { useFormContext } from './FormContext';
import { useHelper } from './useHelper';

export const useField = ({
  name,
}: FieldProps): [FieldInputProps, FieldMetaProps, FieldHelperProps] => {
  const { values, errors, touched, handleChange, handleTouched, handleError } =
    useFormContext();

  const setValue = useHelper(handleChange(name));
  const setTouched = useHelper(handleTouched(name));
  const setError = useHelper(handleError(name));

  return [
    { value: values[name] },
    { error: errors[name], touched: touched[name] },
    {
      setValue,
      setTouched,
      setError,
    },
  ];
};
