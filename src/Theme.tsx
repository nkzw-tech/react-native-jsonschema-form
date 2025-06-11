import { ThemeProps as OriginalThemeProps } from '@rjsf/core';
import { FormContextType, RJSFSchema, StrictRJSFSchema } from '@rjsf/utils';
import { generateTemplates, TemplatesType } from './Templates.tsx';
import { generateWidgets } from './Widgets.tsx';

export type ThemeProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = Omit<OriginalThemeProps<T, S, F>, 'templates'> & {
  templates: Partial<TemplatesType<T, S, F>>;
};

export function generateTheme<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): ThemeProps<T, S, F> {
  return {
    templates: generateTemplates<T, S, F>(),
    widgets: generateWidgets<T, S, F>(),
  };
}

export default generateTheme();
