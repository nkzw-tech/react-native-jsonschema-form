import {
  DescriptionFieldProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';
import getTextComponent from './lib/getTextComponent';

/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ description, id, registry }: DescriptionFieldProps<T, S, F>) {
  if (!description) {
    return null;
  }

  const Text = getTextComponent(registry.templates.TextTemplate);
  return (
    <View>
      <View className="text-sm text-muted-foreground" id={id}>
        <Text>{description}</Text>
      </View>
    </View>
  );
}
