import {
  ArrayFieldItemTemplateType,
  ArrayFieldTemplateProps,
  buttonId,
  FormContextType,
  getTemplate,
  getUiOptions,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';

/** The `ArrayFieldTemplate` component is the template used to render all items in an array.
 *
 * @param props - The `ArrayFieldItemTemplateType` props for the component
 */
export default function ArrayFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: ArrayFieldTemplateProps<T, S, F>) {
  const {
    canAdd,
    disabled,
    idSchema,
    items,
    onAddClick,
    readonly,
    registry,
    required,
    schema,
    title,
    uiSchema,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const ArrayFieldDescriptionTemplate = getTemplate<
    'ArrayFieldDescriptionTemplate',
    T,
    S,
    F
  >('ArrayFieldDescriptionTemplate', registry, uiOptions);
  const ArrayFieldItemTemplate = getTemplate<'ArrayFieldItemTemplate', T, S, F>(
    'ArrayFieldItemTemplate',
    registry,
    uiOptions,
  );
  const ArrayFieldTitleTemplate = getTemplate<
    'ArrayFieldTitleTemplate',
    T,
    S,
    F
  >('ArrayFieldTitleTemplate', registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <View>
      <View className="m-0 flex-row p-0">
        <View className="m-0 w-full p-0">
          <ArrayFieldTitleTemplate
            idSchema={idSchema}
            registry={registry}
            required={required}
            schema={schema}
            title={uiOptions.title || title}
            uiSchema={uiSchema}
          />
          <ArrayFieldDescriptionTemplate
            description={uiOptions.description || schema.description}
            idSchema={idSchema}
            registry={registry}
            schema={schema}
            uiSchema={uiSchema}
          />
          <View
            className="m-0 mb-2 w-full p-0"
            key={`array-item-list-${idSchema.$id}`}
          >
            {items &&
              items.map(
                ({
                  key,
                  ...itemProps
                }: ArrayFieldItemTemplateType<T, S, F>) => (
                  <ArrayFieldItemTemplate key={key} {...itemProps} />
                ),
              )}
            {canAdd && (
              <View className="mt-2 flex-row">
                <AddButton
                  className="rjsf-array-item-add"
                  disabled={disabled || readonly}
                  id={buttonId<T>(idSchema, 'add')}
                  onClick={onAddClick}
                  registry={registry}
                  uiSchema={uiSchema}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
