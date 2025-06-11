import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';
import { AlertCircle } from 'lucide-react-native';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { templates, translateString } = registry;
  const Text = getTextComponent(templates.TextTemplate);
  return (
    <Alert className="mb-2" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle textComponent={Text}>
        {translateString(TranslatableString.ErrorsLabel)}
      </AlertTitle>
      <AlertDescription className="flex-col gap-1">
        {errors.map((error, i: number) => {
          return <Text key={i}>&#x2022; {error.stack}</Text>;
        })}
      </AlertDescription>
    </Alert>
  );
}
