import {
  FormContextType,
  TemplatesType as OriginalTemplatesType,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';
import { ComponentProps, ComponentType } from 'react';
import { Text } from 'react-native';
import AddButton from './AddButton.tsx';
import ArrayFieldItemTemplate from './ArrayFieldItemTemplate.tsx';
import ArrayFieldTemplate from './ArrayFieldTemplate.tsx';
import BaseInputTemplate from './BaseInputTemplate.tsx';
import DescriptionField from './DescriptionField.tsx';
import ErrorList from './ErrorList.tsx';
import FieldErrorTemplate from './FieldErrorTemplate.tsx';
import FieldHelpTemplate from './FieldHelpTemplate.tsx';
import FieldTemplate from './FieldTemplate.tsx';
import GridTemplate from './GridTemplate.tsx';
import {
  CopyButton,
  IconButtonProps,
  MoveDownButton,
  MoveUpButton,
  RemoveButton,
} from './IconButton.tsx';
import MultiSchemaFieldTemplate from './MultiSchemaFieldTemplate.tsx';
import ObjectFieldTemplate from './ObjectFieldTemplate.tsx';
import SubmitButton from './SubmitButton.tsx';
import TitleField from './TitleField.tsx';
import UnsupportedField from './UnsupportedFieldTemplate.tsx';
import WrapIfAdditionalTemplate from './WrapIfAdditionalTemplate.tsx';

export type TemplatesType<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = Omit<OriginalTemplatesType<T, S, F>, 'ButtonTemplates'> & {
  ButtonTemplates: {
    AddButton: ComponentType<IconButtonProps<T, S, F>>;
    CopyButton: ComponentType<IconButtonProps<T, S, F>>;
    MoveDownButton: ComponentType<IconButtonProps<T, S, F>>;
    MoveUpButton: ComponentType<IconButtonProps<T, S, F>>;
    RemoveButton: ComponentType<IconButtonProps<T, S, F>>;
    SubmitButton: ComponentType<SubmitButtonProps<T, S, F>>;
  };
  TextTemplate: ComponentType<ComponentProps<typeof Text>>;
};

export function generateTemplates<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): Partial<TemplatesType<T, S, F>> {
  return {
    ArrayFieldItemTemplate,
    ArrayFieldTemplate,
    BaseInputTemplate,
    ButtonTemplates: {
      AddButton,
      CopyButton,
      MoveDownButton,
      MoveUpButton,
      RemoveButton,
      SubmitButton,
    },
    DescriptionFieldTemplate: DescriptionField,
    ErrorListTemplate: ErrorList,
    FieldErrorTemplate,
    FieldHelpTemplate,
    FieldTemplate,
    GridTemplate,
    MultiSchemaFieldTemplate,
    ObjectFieldTemplate,
    TextTemplate: Text,
    TitleFieldTemplate: TitleField,
    UnsupportedFieldTemplate: UnsupportedField,
    WrapIfAdditionalTemplate,
  };
}

export default generateTemplates();
