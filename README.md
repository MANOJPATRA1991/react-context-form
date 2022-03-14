# react-context-form

A minimal form library for React built with React Context and validation using Yup that provides better performance.

## Available props

### FormProvider

| Name | Type | Default | Description |
| - | - | - | - |
| validateOnMount | boolean | `false` | Determine if the form should run validation on mount |
| validateOnChange | boolean | `false` | Determine if a field should be validated on change in value |
| initialValues | object | `{}` | Initial values for the form |
| onSubmit | function | `(values, form: FormContextType) => {}` | Callback function to be called when the form is submitted |
| validations | object | `{}` | Object containing the validation schema for the form |
| handleFormValueChange | function | `({ fieldName: string; prevValue: any; value: any; form: FormContextType }) => {}` | Callback function to be called when a field value changes |

### FastField

| Name | Type | Description |
| - | - |
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
  setValues: (args: Partial<any>) => void;
  setErrors: (args: Partial<any>) => void;
  setTouched: (args: Partial<any>) => void;
  validateForm: (
    values: any,
    submit: (values: any, form: any) => void,
  ) => Promise<void>;
}
```

## Using the form

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
</FormProvider>
```