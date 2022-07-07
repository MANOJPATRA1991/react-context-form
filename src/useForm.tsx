// @ts-ignore
import React, { useState, useEffect } from 'react';
import { useHelper } from './useHelper';
import {
  ErrorRecord,
  FieldError,
  FormErrors,
  Options,
  TouchedRecord,
} from './types';

export const useForm = <T extends Record<string, any>>(options: Options<T>) => {
  const [data, setData] = useState((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});
  const [touched, setTouched] = useState<TouchedRecord<T>>({});
  const [isValid, setIsValid] = useState(true);

  const setValuesHelper = useHelper((valObj: Partial<T>) => {
    const newTouched: Partial<TouchedRecord<T>> = {};
    for (const key in valObj) {
      newTouched[key] = true;
    }
    setTouched({ ...touched, ...newTouched });
    setData((prev: T) => {
      const next = { ...prev, ...valObj };
      validateForm(next);
      return next;
    });
  });

  const resetValueHelper = useHelper((valObj: Partial<T>) => {
    const newTouched: Partial<TouchedRecord<T>> = {};
    for (const key in valObj) {
      newTouched[key] = true;
    }
    setTouched({ ...newTouched });
    setErrors({});
    setData((_: T) => {
      const next = { ...valObj } as T;
      options.validateOnChange && validateForm(next);
      return next;
    });
  });

  const setErrorsHelper = useHelper((errObj: Partial<ErrorRecord<T>>) =>
    setErrors({ ...errors, ...errObj }),
  );

  const setTouchedHelper = useHelper((touchedObj: Partial<TouchedRecord<T>>) =>
    setTouched({ ...touched, ...touchedObj }),
  );

  useEffect(() => {
    if (options.enableReinitialize) {
      setData((options.initialValues ?? {}) as T);
    }
  }, [...Object.values(options.initialValues ?? {})]);

  useEffect(() => {
    if (options.validateOnMount) {
      if (options.initialTouched) {
        const newTouched = Object.keys(data).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {},
        );
        setTouchedHelper(newTouched);
      }
      validateForm(data);
    }
  }, []);

  const validateField = async (key: string, values: T) => {
    const { fields = {} } = options?.validations ?? {};
    if (!fields[key]) {
      return;
    }

    try {
      await options?.validations?.validateAt(key, values);
      const messages = {
        ...errors,
        [key]: undefined,
      };
      setErrors(messages);
      setIsValid(Object.values(messages).filter(e => !!e).length === 0);
    } catch (err) {
      setErrors({
        ...errors,
        [key]: (err as FieldError).errors[0],
      });
      setIsValid(false);
    }
  };

  const validateForm = async (
    values: T,
    submit: (values: T, form: any) => void = () => {},
  ) => {
    try {
      await options?.validations?.validate(values, { abortEarly: false });
      setErrors({});
      if (submit) {
        setIsValid(true);
        submit(values, { setErrors });
      }
    } catch (err) {
      const messages = (err as FormErrors).inner.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.path]: curr.message,
        };
      }, {});
      setErrors({
        ...messages,
      });
      setIsValid(false);
    }
  };

  const setFieldValue = (key: string, value: any) => {
    setTouched({ ...touched, [key]: true });
    setData((prev: T) => {
      const next = { ...prev, [key]: value };
      options.validateOnChange && validateField(key, next);
      return next;
    });
  };

  const handleChange = (key: string) => (value: any) =>
    setFieldValue(key, value);

  const handleTouched = (key: string) => (value: any) =>
    setTouched({ ...touched, [key]: value });

  const handleError = (key: string) => (value: any) =>
    setErrors({ ...errors, [key]: value });

  const handleSubmit = () => {
    validateForm(data, options?.onSubmit);
  };

  return {
    isValid,
    values: data,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleTouched,
    handleError,
    setValues: setValuesHelper,
    setErrors: setErrorsHelper,
    setTouched: setTouchedHelper,
    resetValues: resetValueHelper,
    validateForm,
  };
};
