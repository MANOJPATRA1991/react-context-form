import React, { useMemo } from "react";

import { useField } from "./useField";

import { FormFieldProps } from "./types";

/**
 * @component **FastField**
 *
 * @description Component to render field in the context of **FormProvider**
 *
 * @example
 * <FastField
 *  name="firstName"
 *  component="text"
 * />
 * @example
 * FastField with children
 * <FastField
 *  name="firstName"
 *  component="text"
 * >
 *   {children}
 * </FastField>
 */
export const FastField = ({
  name,
  children,
  component,
  ...props
}: FormFieldProps): JSX.Element => {
  const Component = component;

  const [field, meta, helpers] = useField({ name });

  const comp = useMemo(
    () => (
      <Component
        error={meta.error && meta.touched ? meta.error : ""}
        value={field.value}
        onBlur={() => helpers.setTouched(true)}
        onChange={helpers.setValue}
        {...props}
      >
        {children}
      </Component>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [field.value, meta.error, meta.touched, props.disabled]
  );

  return comp;
};
