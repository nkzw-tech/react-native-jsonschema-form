import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps, forwardRef } from 'react';
import { Text, View } from 'react-native';
import { TextComponent } from 'src/lib/getTextComponent.tsx';
import { cx } from '../../lib/cx.tsx';

const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:start-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:ps-7',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
  },
);

/** A component that displays a brief, important message in a way that attracts the user's attention without interrupting their task.
 *
 * @param props - Component props
 * @param props.variant - 'default' | 'destructive' - Style variant of the alert
 * @param props.className - Additional CSS classes
 * @returns A div element that serves as an alert component
 */
const Alert = forwardRef<
  View,
  ComponentProps<typeof View> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <View
    className={cx(alertVariants({ variant }), className)}
    ref={ref}
    role="alert"
    {...props}
  />
));
Alert.displayName = 'Alert';

/** Represents the title content of an Alert component.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @returns A heading element for the alert title
 */
const AlertTitle = forwardRef<
  Text,
  ComponentProps<typeof Text> &
    Readonly<{
      textComponent: TextComponent;
    }>
>(({ className, textComponent: TextComponent, ...props }, ref) => (
  <TextComponent
    className={cx('mb-1 font-medium leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

/** Represents the description content of an Alert component.
 *
 * @param props - Component props
 * @param props.className - Additional CSS classes
 * @returns A div element containing the alert description
 */
export function AlertDescription({
  className,
  ...props
}: ComponentProps<typeof View>) {
  return (
    <View
      className={cx('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle };
