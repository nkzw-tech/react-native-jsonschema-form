import {
  FieldTemplateProps,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';
import { cx } from './lib/cx.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
export default function FieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  children,
  classNames,
  description,
  disabled,
  displayLabel,
  errors,
  help,
  hidden,
  id,
  label,
  onDropPropertyClick,
  onKeyChange,
  rawDescription,
  rawErrors = [],
  readonly,
  registry,
  required,
  schema,
  style,
  uiSchema,
}: FieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions(uiSchema);
  const WrapIfAdditionalTemplate = getTemplate<
    'WrapIfAdditionalTemplate',
    T,
    S,
    F
  >('WrapIfAdditionalTemplate', registry, uiOptions);
  if (hidden) {
    return <View className="hidden">{children}</View>;
  }

  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <WrapIfAdditionalTemplate
      classNames={classNames}
      disabled={disabled}
      id={id}
      label={label}
      onDropPropertyClick={onDropPropertyClick}
      onKeyChange={onKeyChange}
      readonly={readonly}
      registry={registry}
      required={required}
      schema={schema}
      style={style}
      uiSchema={uiSchema}
    >
      <View className="flex-col gap-3">
        {displayLabel && (
          <Text
            className={cx(
              'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              { 'text-destructive': rawErrors.length > 0 },
            )}
          >
            {label}
            {required ? '*' : null}
          </Text>
        )}
        {children}
        {displayLabel && rawDescription && (
          <Text
            className={cx('text-xs font-medium text-muted-foreground', {
              'text-destructive': rawErrors.length > 0,
            })}
          >
            {description}
          </Text>
        )}
        {errors}
        {help}
      </View>
    </WrapIfAdditionalTemplate>
  );
}
