import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Pressable, View } from 'react-native';
import { Label } from './components/ui/label.tsx';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group.tsx';
import { cx } from './lib/cx.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  disabled,
  id,
  onChange,
  options,
  readonly,
  registry,
  value,
}: WidgetProps<T, S, F>) {
  const { emptyValue, enumDisabled, enumOptions } = options;

  const _onChange = (value: string) =>
    onChange(enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  const inline = Boolean(options && options.inline);
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <View className="mb-0">
      <RadioGroup
        aria-describedby={ariaDescribedByIds<T>(id)}
        className={cx('flex-wrap', inline ? 'flex-row' : 'flex-col')}
        disabled={disabled || readonly}
        onValueChange={_onChange}
        value={
          enumOptionsIndexForValue<S>(
            value ?? emptyValue,
            enumOptions,
            false,
          ) as unknown as string as unknown as string
        }
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            return (
              <View
                className="flex-row items-center gap-2"
                key={optionId(id, index)}
              >
                <RadioGroupItem
                  disabled={itemDisabled}
                  id={optionId(id, index)}
                  value={String(index)}
                />
                <Pressable
                  className={cx(!itemDisabled && 'active:opacity-50')}
                  hitSlop={6}
                  onPress={
                    !itemDisabled ? () => _onChange(String(index)) : undefined
                  }
                >
                  <Label className="leading-tight" textComponent={Text}>
                    {option.label}
                  </Label>
                </Pressable>
              </View>
            );
          })}
      </RadioGroup>
    </View>
  );
}
