import {
  FieldHelpProps,
  FormContextType,
  helpId,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { cx } from './lib/cx.tsx';
import getTextComponent from './lib/getTextComponent.tsx';

/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: FieldHelpProps<T, S, F>) {
  const { hasErrors, help, idSchema, registry } = props;
  if (!help) {
    return null;
  }
  const id = helpId<T>(idSchema);
  const Text = getTextComponent(registry.templates.TextTemplate);

  return (
    <Text
      className={cx('text-xs font-medium text-muted-foreground', {
        'text-destructive': hasErrors,
      })}
      id={id}
    >
      {help}
    </Text>
  );
}
