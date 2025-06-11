import {
  FormContextType,
  RegistryWidgetsType,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import CheckboxesWidget from './CheckboxesWidget.tsx';
import CheckboxWidget from './CheckboxWidget.tsx';
import RadioWidget from './RadioWidget.tsx';
import RangeWidget from './RangeWidget.tsx';
import SelectWidget from './SelectWidget.tsx';
import TextareaWidget from './TextareaWidget.tsx';

export function generateWidgets<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(): RegistryWidgetsType<T, S, F> {
  return {
    CheckboxesWidget,
    CheckboxWidget,
    RadioWidget,
    RangeWidget,
    SelectWidget,
    TextareaWidget,
  };
}

export default generateWidgets();
