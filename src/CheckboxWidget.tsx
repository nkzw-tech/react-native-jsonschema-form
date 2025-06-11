import {
  ariaDescribedByIds,
  descriptionId,
  FormContextType,
  getTemplate,
  labelValue,
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

/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    disabled,
    hideLabel,
    id,
    label,
    onBlur,
    onChange,
    onFocus,
    options,
    readonly,
    registry,
    schema,
    uiSchema,
    value,
  } = props;
  const DescriptionFieldTemplate = getTemplate<
    'DescriptionFieldTemplate',
    T,
    S,
    F
  >('DescriptionFieldTemplate', registry, options);

  const Text = getTextComponent(registry.templates.TextTemplate);
  const Checkbox = pickComponent(
    registry.templates.CheckboxTemplate,
    _Checkbox,
  );

  const isDisabled = disabled || readonly;

  const _onChange = (checked: boolean) => onChange(checked);
  const _onBlur = () => onBlur(id, value);
  const _onFocus = () => onFocus(id, value);

  const description = options.description || schema.description;
  return (
    <View
      aria-describedby={ariaDescribedByIds<T>(id)}
      className={`relative ${disabled || readonly ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      {!hideLabel && description && (
        <DescriptionFieldTemplate
          description={description}
          id={descriptionId<T>(id)}
          registry={registry}
          schema={schema}
          uiSchema={uiSchema}
        />
      )}
      <View className="my-2 flex-row items-center gap-2">
        <Checkbox
          checked={value === undefined ? false : Boolean(value)}
          disabled={isDisabled}
          id={id}
          onBlur={_onBlur}
          onCheckedChange={_onChange}
          onFocus={_onFocus}
        />
        <Pressable
          className={cx(!isDisabled && 'active:opacity-50')}
          hitSlop={6}
          onPress={
            !isDisabled
              ? () => _onChange(!(value === undefined ? false : Boolean(value)))
              : undefined
          }
        >
          <Label className="leading-tight" textComponent={Text}>
            {labelValue(label, hideLabel || !label)}
          </Label>
        </Pressable>
      </View>
    </View>
  );
}
