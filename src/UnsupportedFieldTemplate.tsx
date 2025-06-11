import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
  UnsupportedFieldProps,
} from '@rjsf/utils';
import { View } from 'react-native';
import getTextComponent from './lib/getTextComponent';

/** The `UnsupportedField` component is used to render a field in the schema is one that is not supported by
 * react-jsonschema-form.
 *
 * @param props - The `FieldProps` for this template
 */
function UnsupportedField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: UnsupportedFieldProps<T, S, F>) {
  const { idSchema, reason, registry, schema } = props;
  const { translateString } = registry;
  let translateEnum: TranslatableString = TranslatableString.UnsupportedField;
  const translateParams: string[] = [];
  if (idSchema && idSchema.$id) {
    translateEnum = TranslatableString.UnsupportedFieldWithId;
    translateParams.push(idSchema.$id);
  }
  if (reason) {
    translateEnum =
      translateEnum === TranslatableString.UnsupportedField
        ? TranslatableString.UnsupportedFieldWithReason
        : TranslatableString.UnsupportedFieldWithIdAndReason;
    translateParams.push(reason);
  }
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <View>
      <Text>{translateString(translateEnum, translateParams)}</Text>
      {schema && <Text>{JSON.stringify(schema, null, 2)}</Text>}
    </View>
  );
}

export default UnsupportedField;
