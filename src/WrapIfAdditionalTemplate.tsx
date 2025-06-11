import {
  ADDITIONAL_PROPERTY_FLAG,
  buttonId,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  WrapIfAdditionalTemplateProps,
} from '@rjsf/utils';
import { View, type ViewStyle } from 'react-native';
import { Input } from './components/ui/input.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
export default function WrapIfAdditionalTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  children,
  classNames,
  disabled,
  id,
  label,
  onDropPropertyClick,
  readonly,
  registry,
  schema,
  style,
  uiSchema,
}: Omit<WrapIfAdditionalTemplateProps<T, S, F>, 'style'> &
  Readonly<{ style: ViewStyle }>) {
  const { templates, translateString } = registry;
  // Button templates are not overridden in the uiSchema
  const { RemoveButton } = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;

  if (!additional) {
    return (
      <View className={classNames} style={style}>
        {children}
      </View>
    );
  }

  const keyId = `${id}-key`;
  const Text = getTextComponent(templates.TextTemplate);

  return (
    <>
      <View
        className={`relative w-full flex-row items-center gap-2 ${classNames}`}
        style={style}
      >
        <View className="line-clamp-1 w-full flex-col gap-2">
          <View className="flex-grow">
            <Text className="mb-4 line-clamp-1 pt-2 text-sm font-medium text-muted-foreground">
              {keyLabel}
            </Text>
            <View className="pl-0.5">
              <Input
                className="mt-1 w-full border"
                defaultValue={label}
                id={keyId}
              />
            </View>
          </View>
          <View className="flex-grow pr-0.5">{children}</View>
        </View>
        <RemoveButton
          className="rjsf-object-property-remove w-full"
          disabled={disabled || readonly}
          iconType="block"
          id={buttonId<T>(id, 'remove')}
          onClick={onDropPropertyClick(label)}
          registry={registry}
          uiSchema={uiSchema}
        />
      </View>
    </>
  );
}
