import {
  FormContextType,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
  TitleFieldProps,
} from '@rjsf/utils';
import { View } from 'react-native';
import getTextComponent from './lib/getTextComponent';

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ id, registry, title, uiSchema }: TitleFieldProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <View className="my-1 flex-col gap-0.5" id={id}>
      <Text>{uiOptions.title || title}</Text>
    </View>
  );
}
