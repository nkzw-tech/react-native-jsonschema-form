import {
  ArrayFieldItemTemplateType,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';

/** The `ArrayFieldItemTemplate` component is the template used to render an items of an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldItemTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldItemTemplateType<T, S, F>) {
  const { buttonsProps, children, hasToolbar, registry, uiSchema } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldItemButtonsTemplate = getTemplate<
    'ArrayFieldItemButtonsTemplate',
    T,
    S,
    F
  >('ArrayFieldItemButtonsTemplate', registry, uiOptions);
  return (
    <View>
      <View className="mb-2 flex-row flex-wrap">
        <View className="shrink grow">{children}</View>
        <View className="flex-row items-end justify-end p-0.5">
          {hasToolbar && (
            <View className="flex-row gap-2">
              <ArrayFieldItemButtonsTemplate {...buttonsProps} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
