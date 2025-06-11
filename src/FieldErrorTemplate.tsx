import {
  errorId,
  FieldErrorProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';
import getTextComponent from './lib/getTextComponent';

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldErrorProps<T, S, F>) {
  const { errors = [], idSchema, registry } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId<T>(idSchema);
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <View className="flex-col gap-1" id={id}>
      {errors.map((error, i: number) => {
        return (
          <Text className={'mb-1 text-xs font-medium text-destructive'} key={i}>
            {error}
          </Text>
        );
      })}
    </View>
  );
}
