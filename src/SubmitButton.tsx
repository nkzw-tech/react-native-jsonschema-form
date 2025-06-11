import {
  FormContextType,
  getSubmitButtonOptions,
  RJSFSchema,
  StrictRJSFSchema,
  SubmitButtonProps,
} from '@rjsf/utils';
import { View } from 'react-native';
import { Button } from './components/ui/button.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
export default function SubmitButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: SubmitButtonProps<T, S, F>) {
  const {
    norender,
    props: submitButtonProps,
    submitText,
  } = getSubmitButtonOptions<T, S, F>(props.uiSchema);
  if (norender) {
    return null;
  }

  const Text = getTextComponent(props.registry.templates.TextTemplate);

  return (
    <View>
      <Button {...submitButtonProps} className="my-2">
        <Text>{submitText}</Text>
      </Button>
    </View>
  );
}
