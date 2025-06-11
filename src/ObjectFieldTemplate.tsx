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
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <>
      {title && (
        <TitleFieldTemplate
          id={titleId<T>(idSchema)}
          registry={registry}
          required={required}
          schema={schema}
          title={title}
          uiSchema={uiSchema}
        />
      )}
      {description && (
        <DescriptionFieldTemplate
          description={description}
          id={descriptionId<T>(idSchema)}
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
        {canExpand(schema, uiSchema, formData) ? (
          <AddButton
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
