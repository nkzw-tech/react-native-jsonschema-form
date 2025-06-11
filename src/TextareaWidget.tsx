import {
  ariaDescribedByIds,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { View } from 'react-native';
import { Textarea } from './components/ui/textarea.tsx';

type CustomWidgetProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = WidgetProps<T, S, F> & {
  options: any;
};

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  autofocus,
  id,
  onChange,
  options,
  placeholder,
  readonly,
  value,
}: CustomWidgetProps<T, S, F>) {
  const _onChange = (value: string) =>
    onChange(value === '' ? options.emptyValue : value);

  return (
    <View className="flex-row">
      <Textarea
        aria-describedby={ariaDescribedByIds<T>(id)}
        autoFocus={autofocus}
        id={id}
        numberOfLines={options.rows || 5}
        onChangeText={_onChange}
        placeholder={placeholder}
        readOnly={readonly}
        value={value ?? ''}
      />
    </View>
  );
}
