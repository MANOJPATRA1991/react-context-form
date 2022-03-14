// @ts-ignore
import React, { useEffect } from 'react';
import { usePrevious } from './usePrevious';
import { useFormContext } from './FormContext';
import { FormEffectProps } from './types';


export const FormEffect = ({ onChange }: FormEffectProps) => {
  const form = useFormContext();
  const prevValues = usePrevious(form.values);

  useEffect(() => {
    if (prevValues) {
      for (const key in form.values) {
        const prevValue = prevValues![key];
        const currValue = form.values[key];
        if (!Object.is(prevValue, currValue)) {
          onChange({
            fieldName: key,
            value: currValue,
            prevValue: prevValue,
            form,
          });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values]);

  return null;
};
