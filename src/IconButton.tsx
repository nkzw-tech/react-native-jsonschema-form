import {
  FormContextType,
  RJSFBaseProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { ChevronDown, ChevronUp, Copy, Trash2 } from 'lucide-react-native';
import { ComponentProps, ReactElement } from 'react';
import { View } from 'react-native';
import { Button, ButtonProps } from './components/ui/button.tsx';
import { TemplatesType } from './Templates.tsx';

export type IconButtonProps<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
> = ComponentProps<typeof View> &
  Omit<RJSFBaseProps<T, S, F>, 'schema' | 'templates'> & {
    /** The name representation or actual react element implementation for the icon */
    icon?: string | ReactElement;
    /** An alternative specification for the type of the icon button */
    iconType?: string;
    templates: TemplatesType<T, S, F>;
  };

/** Base button component that renders a Shadcn button with an icon for RJSF form actions.
 * This component serves as the foundation for other specialized buttons used in array operations.
 * It combines RJSF's IconButtonProps with Shadcn's ButtonProps to provide a consistent styling
 * and behavior across the form.
 *
 * @param props - The combined props from RJSF IconButtonProps and Shadcn ButtonProps, including icon and event handlers
 */
export default function IconButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F> & ButtonProps) {
  const { className, icon, iconType, registry, uiSchema, ...otherProps } =
    props;
  return (
    <Button className={className} size="icon" variant="outline" {...otherProps}>
      {icon}
    </Button>
  );
}

/** Renders a copy button for RJSF array fields that allows users to duplicate array items.
 * The button includes a copy icon and uses the RJSF translation system for the tooltip text.
 * This is used within ArrayField to provide item duplication functionality.
 *
 * @param props - The RJSF icon button properties, including registry for translations and event handlers
 */
export function CopyButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  return <IconButton {...props} icon={<Copy size={16} />} />;
}

/** Renders a move down button for RJSF array fields that allows reordering of array items.
 * The button includes a chevron-down icon and uses the RJSF translation system for the tooltip text.
 * This is used within ArrayField to allow moving items to a lower index in the array.
 *
 * @param props - The RJSF icon button properties, including registry for translations and event handlers
 */
export function MoveDownButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  return <IconButton {...props} icon={<ChevronDown size={16} />} />;
}

/** Renders a move up button for RJSF array fields that allows reordering of array items.
 * The button includes a chevron-up icon and uses the RJSF translation system for the tooltip text.
 * This is used within ArrayField to allow moving items to a higher index in the array.
 *
 * @param props - The RJSF icon button properties, including registry for translations and event handlers
 */
export function MoveUpButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  return <IconButton {...props} icon={<ChevronUp size={16} />} />;
}

/** Renders a remove button for RJSF array fields that allows deletion of array items.
 * The button includes a trash icon and uses the RJSF translation system for the tooltip text.
 * It has special styling with destructive colors to indicate its dangerous action.
 * This is used within ArrayField to provide item removal functionality.
 *
 * @param props - The RJSF icon button properties, including registry for translations and event handlers
 */
export function RemoveButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: IconButtonProps<T, S, F>) {
  return (
    <IconButton
      {...props}
      className={'border-destructive'}
      icon={<Trash2 size={16} />}
    />
  );
}
