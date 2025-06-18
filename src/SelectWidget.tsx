import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { SelectBottomSheet } from './components/ui/select-bottom-sheet.tsx';
import { cx } from './lib/cx.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  defaultValue,
  disabled,
  id,
  multiple,
  onChange,
  options,
  placeholder,
  rawErrors = [],
  readonly,
  registry,
  required,
  value,
}: WidgetProps<T, S, F>) {
  const { emptyValue: optEmptyValue, enumDisabled, enumOptions } = options;

  const items = (enumOptions as any)?.map(
    ({ label, value }: any, index: number) => ({
      disabled: Array.isArray(enumDisabled) && enumDisabled.includes(value),
      index,
      label,
      value: index.toString(),
    }),
  );

  return (
    <SelectBottomSheet
      ariaDescribedby={ariaDescribedByIds<T>(id)}
      className={cx({ 'border-destructive': rawErrors.length > 0 })}
      disabled={disabled || readonly}
      items={items}
      multiple={multiple}
      onValueChange={(selectedValue) => {
        onChange(
          enumOptionsValueForIndex<S>(
            selectedValue,
            enumOptions,
            optEmptyValue,
          ),
        );
      }}
      placeholder={placeholder}
      required={required}
      selected={
        enumOptionsIndexForValue<S>(
          value ?? defaultValue,
          enumOptions,
          multiple,
        ) as unknown as string
      }
      textComponent={getTextComponent(registry.templates.TextTemplate)}
    />
  );
}
