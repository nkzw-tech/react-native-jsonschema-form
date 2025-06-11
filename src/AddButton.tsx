import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from '@rjsf/utils';
import { PlusCircle } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from './components/ui/button.tsx';
import { IconButtonProps } from './IconButton.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/**
 * A button component for adding new items in a form
 * @param props - The component properties
 */
export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ registry, uiSchema, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <View className="m-0 p-0">
      <Button {...props} className="w-fit flex-row gap-2" variant="outline">
        <PlusCircle size={16} />
        <Text>{translateString(TranslatableString.AddItemButton)}</Text>
      </Button>
    </View>
  );
}
