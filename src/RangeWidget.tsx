import {
  ariaDescribedByIds,
  FormContextType,
  rangeSpec,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import { Slider } from './components/ui/slider.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

const allowedProps = [
  'maximumValue',
  'maximumValue',
  'step',
  'value',
  'onValueChange',
  'className',
  'inverted',
];

/**
 * A range widget component that renders a slider for number input
 * @param {object} props - The widget properties
 * @param {number} props.value - The current value of the range
 * @param {boolean} props.readonly - Whether the widget is read-only
 * @param {boolean} props.disabled - Whether the widget is disabled
 * @param {object} props.options - Additional options for the widget
 * @param props.schema - The JSON schema for this field
 * @param {(value: any) => void} props.onChange - Callback for when the value changes
 * @param {string} props.label - The label for the range input
 * @param {string} props.id - The unique identifier for the widget
 * @returns {JSX.Element} The rendered range widget
 */
export default function RangeWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  disabled,
  id,
  label,
  onChange,
  options,
  readonly,
  registry,
  schema,
  value,
}: WidgetProps<T, S, F>): JSX.Element {
  const _onChange = (value: number) => onChange(value);

  const sliderProps = { id, label, value, ...rangeSpec<S>(schema) };
  const uiProps: Record<string, unknown> = {
    id,
  };
  const Text = getTextComponent(registry.templates.TextTemplate);

  for (const prop of allowedProps) {
    if (options[prop] !== undefined) {
      uiProps[prop] = options[prop];
    }
  }

  const number = value != null ? Number(value) : null;
  const displayValue =
    Number.isNaN(number) || number === null
      ? ''
      : Number.isInteger(number)
        ? String(number)
        : number.toFixed(2);
  return (
    <>
      <Slider
        disabled={disabled || readonly}
        maximumValue={sliderProps.max}
        minimumValue={sliderProps.min}
        onValueChange={_onChange}
        step={sliderProps.step}
        value={value}
        {...uiProps}
        aria-describedby={ariaDescribedByIds<T>(id)}
      />
      <Text>{displayValue}</Text>
    </>
  );
}
