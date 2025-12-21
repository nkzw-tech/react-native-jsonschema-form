import {
  buttonId,
  canExpand,
  descriptionId,
  FormContextType,
  getTemplate,
  getUiOptions,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  titleId,
} from '@rjsf/utils';
import { cx } from 'class-variance-authority';
import { View } from 'react-native';
import AddButton from './AddButton';
import getTextComponent from './lib/getTextComponent';

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  description,
  disabled,
  formData,
  idSchema,
  onAddClick,
  properties,
  readonly,
  registry,
  required,
  schema,
  title,
  uiSchema,
}: ObjectFieldTemplateProps<T, S, F>) {
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<'TitleFieldTemplate', T, S, F>(
    'TitleFieldTemplate',
    registry,
    uiOptions,
  );
  const DescriptionFieldTemplate = getTemplate<
    'DescriptionFieldTemplate',
    T,
    S,
    F
  >('DescriptionFieldTemplate', registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  const AddButtonComponent =
    registry.templates?.ButtonTemplates?.AddButton || AddButton;
  const Text = getTextComponent(registry.templates.TextTemplate);

  // Safely get IDs, providing fallback if idSchema is undefined
  const titleIdValue = idSchema ? titleId<T>(idSchema) : undefined;
  const descriptionIdValue = idSchema ? descriptionId<T>(idSchema) : undefined;

  return (
    <>
      {title && titleIdValue && (
        <TitleFieldTemplate
          id={titleIdValue}
          registry={registry}
          required={required}
          schema={schema}
          title={title}
          uiSchema={uiSchema}
        />
      )}
      {description && descriptionIdValue && (
        <DescriptionFieldTemplate
          description={description}
          id={descriptionIdValue}
          registry={registry}
          schema={schema}
          uiSchema={uiSchema}
        />
      )}
      <View className="flex-col gap-5">
        {properties.map((element: any, index: number) => (
          <View
            className={cx('flex-row', element.hidden && 'hidden')}
            key={index}
          >
            <Text className="w-full">{element.content}</Text>
          </View>
        ))}
        {canExpand(schema, uiSchema, formData) && idSchema ? (
          <AddButtonComponent
            className="rjsf-object-property-expand"
            disabled={disabled || readonly}
            id={buttonId<T>(idSchema, 'add')}
            onClick={onAddClick(schema)}
            registry={registry}
            uiSchema={uiSchema}
          />
        ) : null}
      </View>
    </>
  );
}
