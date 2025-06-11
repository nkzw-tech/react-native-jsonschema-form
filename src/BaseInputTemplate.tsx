import {
  ariaDescribedByIds,
  BaseInputTemplateProps,
  examplesId,
  FormContextType,
  getInputProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { ChangeEvent } from 'react';
import { View } from 'react-native';
import { Input } from './components/ui/input.tsx';
import { cx } from './lib/cx.tsx';

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
export default function BaseInputTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  autofocus,
  children,
  disabled,
  extraProps,
  id,
  onChange,
  onChangeOverride,
  options,
  placeholder,
  rawErrors = [],
  readonly,
  required,
  schema,
  type,
  value,
}: BaseInputTemplateProps<T, S, F>) {
  const inputProps = {
    ...extraProps,
    ...getInputProps<T, S, F>(schema, type, options),
  };
  const onChangeText = (value: string) => {
    if (onChangeOverride) {
      onChangeOverride({
        target: { value },
      } as unknown as ChangeEvent<HTMLInputElement>);
    } else {
      onChange(value === '' ? options.emptyValue : value);
    }
  };

  return (
    <View>
      <Input
        autoFocus={autofocus}
        className={cx({
          'border-destructive': rawErrors.length > 0,
        })}
        disabled={disabled}
        id={id}
        list={schema.examples ? examplesId<T>(id) : undefined}
        name={id}
        placeholder={placeholder}
        readOnly={readonly}
        required={required}
        type={type}
        {...inputProps}
        aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
        onChangeText={onChangeText}
        value={value || value === 0 ? value : ''}
      />
      {children}
    </View>
  );
}
