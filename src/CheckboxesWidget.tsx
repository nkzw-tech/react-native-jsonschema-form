import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  FormContextType,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Pressable, View } from 'react-native';
import { Checkbox as _Checkbox } from './components/ui/checkbox.tsx';
import { Label } from './components/ui/label.tsx';
import { cx } from './lib/cx.tsx';
import getTextComponent from './lib/getTextComponent.tsx';
import pickComponent from './lib/pickComponent.tsx';

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxesWidget<
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
  const { enumDisabled, enumOptions, inline } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];
  const Text = getTextComponent(registry.templates.TextTemplate);
  const Checkbox = pickComponent(
    registry.templates.CheckboxTemplate,
    _Checkbox,
  );

  return (
    <View
      className={cx({
        'flex-col gap-3': !inline,
        'flex-row flex-wrap gap-4': inline,
      })}
    >
      {Array.isArray(enumOptions) &&
        enumOptions.map((option, index: number) => {
          const checked = enumOptionsIsSelected<S>(
            option.value,
            checkboxesValues,
          );
          const itemDisabled =
            Array.isArray(enumDisabled) &&
            enumDisabled.indexOf(option.value) !== -1;
          const isDisabled = disabled || itemDisabled || readonly;
          const indexOptionId = optionId(id, index);
          const onCheckedChange = (state: any) => {
            if (state) {
              onChange(
                enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions),
              );
            } else {
              onChange(
                enumOptionsDeselectValue<S>(
                  index,
                  checkboxesValues,
                  enumOptions,
                ),
              );
            }
          };

          return (
            <View className="flex-row items-center gap-2" key={indexOptionId}>
              <Checkbox
                aria-describedby={ariaDescribedByIds<T>(id)}
                checked={checked}
                disabled={isDisabled}
                id={indexOptionId}
                onCheckedChange={onCheckedChange}
              />
              <Pressable
                className={cx(!isDisabled && 'active:opacity-50')}
                hitSlop={6}
                onPress={
                  !isDisabled ? () => onCheckedChange(!checked) : undefined
                }
              >
                <Label className="leading-tight" textComponent={Text}>
                  {option.label}
                </Label>
              </Pressable>
            </View>
          );
        })}
    </View>
  );
}
