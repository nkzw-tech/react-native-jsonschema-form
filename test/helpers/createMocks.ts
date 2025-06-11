import { getDefaultRegistry } from '@rjsf/core';
import {
  createSchemaUtils,
  englishStringTranslator,
  RJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import BaseInputTemplate from '../../src/BaseInputTemplate';
import Templates from '../../src/Templates';

export const mockSchema: RJSFSchema = {
  items: {
    type: 'string',
  },
  type: 'array',
};

export const mockEventHandlers = (): void => void 0;

export const mockSchemaUtils = createSchemaUtils(validator, mockSchema);

export function makeWidgetMockProps(
  props: Partial<WidgetProps> = {},
): WidgetProps {
  return {
    autofocus: true,
    disabled: false,
    formContext: {},
    id: '_id',
    label: 'Some simple label',
    multiple: false,
    name: '_name',
    onBlur: mockEventHandlers,
    onChange: mockEventHandlers,
    onFocus: mockEventHandlers,
    options: {},
    placeholder: '',
    rawErrors: [''],
    readonly: true,
    registry: {
      fields: {},
      formContext: {},
      rootSchema: {},
      schemaUtils: mockSchemaUtils,
      // @ts-expect-error
      templates: { ...getDefaultRegistry().templates, ...Templates },
      translateString: englishStringTranslator,
      widgets: { TextWidget: BaseInputTemplate },
    },
    required: true,
    schema: mockSchema,
    uiSchema: {},
    value: 'value',
    ...props,
  };
}
