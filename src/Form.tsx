import {
  FormProps as OriginalFormProps,
  withTheme as originalWithTheme,
} from '@rjsf/core';
import { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { ComponentType } from 'react';
import { View } from 'react-native';
import { TemplatesType } from './Templates.tsx';
import { generateTheme, ThemeProps } from './Theme.tsx';

type FormProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = Omit<OriginalFormProps<T, S, F>, 'templates'> & {
  templates?: Partial<Omit<TemplatesType<T, S, F>, 'ButtonTemplates'>> & {
    ButtonTemplates?: Partial<TemplatesType<T, S, F>['ButtonTemplates']>;
  };
};

const withTheme = originalWithTheme as unknown as <
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(
  themeProps: ThemeProps<T, S, F>,
) => ComponentType<FormProps<T, S, F>>;

export function generateForm<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): ComponentType<FormProps<T, S, F>> {
  return withTheme<T, S, F>({
    ...generateTheme<T, S, F>(),
    _internalFormWrapper: View,
  });
}

export default generateForm();
