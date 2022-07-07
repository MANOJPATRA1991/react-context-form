# react-context-perf-form

A minimal form library for React built with React Context and validation using Yup that provides better performance.

## Available props

### FormProvider

| Name | Type | Default | Description |
| - | - | - | - |
| validateOnMount | boolean | `false` | Determine if the form should run validation on mount |
| validateOnChange | boolean | `false` | Determine if a field should be validated on change in value |
| initialTouched | boolean | `false` | Determine if fields will be touched initially |
| initialValues | object | `{}` | Initial values for the form |
| onSubmit | function |  | `(values, form: FormContextType) => {}` Callback function to be called when the form is submitted |
| validations | object | `{}` | Yup Object containing the validation schema for the form |
| onFormValueChange | function |  | `({ fieldName: string; prevValue: any; value: any; form: FormContextType }) => {}` Callback function to be called when a field value changes |
enableReinitialize | boolean | | Determines if reinitialisation is required on initialValue change

### FastField

| Name | Type | Description |
| - | - | - |
| name | string | Name of the field |
| component | JSX.Element | Component to render for a field |

**NOTE**: Pass component specific props with spread operator

## `FormContextType`

```typescript
type FormContextType = {
  values: Record<string, any>;
  errors: Partial<Record<string, any>>;
  touched: Partial<Record<string, any>>;
  handleChange: (key: string) => (value: any) => void;
  handleTouched: (key: string) => (value: any) => void;
  handleError: (key: string) => (value: any) => void;
  setValues: (args: Partial<Record<string, any>>) => void;
  resetValues: (args: Partial<Record<string, any>>) => void;
  setErrors: (args: Partial<Record<string, any>>) => void;
  setTouched: (args: Partial<Record<string, any>>) => void;
  validateForm: (
    values: any,
    submit: (values: any, form: any) => void,
  ) => Promise<void>;
}
```

## Using the form

### Use case 1

For simple forms with single input fields such as text, select, radio, checkbox or any custom component with one input field, we can make use of `FastField`.

```typescript
const submitDetails = (values, form) => { ... };

const onFormValueChange = ({
  fieldName,
  prevValue,
  value: currentValue,
  form,
}) => {
  case 'firstName':
    // Do something;
    break;
  case 'lastName':
    // Do something;
    break;
}

<FormProvider
  validateOnMount
  validateOnChange
  initialValues={{}}
  onSubmit={submitDetails}
  validations={validationSchema} // Yup validation schema
  onFormValueChange={onFormValueChange}
>
  {(form: FormContextType) => (
    <>
      <FastField
        name="firstName"
        component={SomeComponent} 
        {...props} // SomeComponent's props 
      />
      <FastField
        name="lastName"
        component={SomeComponent} 
        {...props} // SomeComponent's props 
      />
    </>
  )}
</FormProvider>
```

**NOTE**: `FastField` works only inside `FormProvider`.

### Use case 2

For more sophisticated form fields, we might want to keep the logic for the field separate, in such cases we can have the following approach:

```typescript
const ComplexField = () => {
  return (
    <View>
      ...
      <FastField ... />
      ...
    </View>
  );
};
```

```typescript
const submitDetails = (values, form) => { ... };

const handleFormValueChange = ({
  fieldName,
  prevValue,
  value: currentValue,
  form,
}) => {
  case 'firstName':
    // Do something;
    break;
  case 'lastName':
    // Do something;
    break;
}

<FormProvider
  validateOnMount
  validateOnChange
  initialValues={{}}
  onSubmit={submitDetails}
  validations={validationSchema} // Yup validation schema
  handleFormValueChange={handleFormValueChange}
>
  {(form: FormContextType) => (
    <>
      <ComplexField />
    </>
  )}
</FormProvider>
```

### Other use case

`useField`, `useFormContext` are also available for use cases that are not covered above and that require more complex business logic and implementation.

#### useField

```typescript
const [field, meta, helpers] = useField({ name });
```

- `field` contains one property - 

    - `value` - field’s value

- `meta` contains two properties -

    - `error` - field’s error message

    - `touched` - boolean

- `helpers` contains three properties -

    - `setValue` - used to set value of field(s)

    - `setTouched` - used to set touched status of field(s)

    - `setError` - used to set error on field(s)

#### useFormContext

This can be used to get all properties defined in `FormContextType` above.