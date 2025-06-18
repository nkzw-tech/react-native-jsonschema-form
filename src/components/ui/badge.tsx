import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';
import { View } from 'react-native';
import { cx } from '../../lib/cx.tsx';

/**
 * Predefined badge variants using class-variance-authority
 * @see https://ui.shadcn.com/docs/components/badge
 */
const badgeVariants = cva(
  'flex-row items-center rounded-md px-1 py-0.5 text-xs font-semibold transition-colors gap-1',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
);

/**
 * Props for the Badge component
 * @extends HTMLAttributes<HTMLDivElement> - HTML div element attributes
 * @extends VariantProps<typeof badgeVariants> - Badge variant props
 */
export interface BadgeProps
  extends ComponentProps<typeof View>,
    VariantProps<typeof badgeVariants> {}

/**
 * A badge component that displays short status descriptors
 *
 * @param props - The props for the Badge component
 * @param props.className - Additional CSS classes to apply to the badge
 * @param props.variant - The style variant of the badge: 'default' | 'secondary' | 'destructive' | 'outline'
 * @returns A div element that displays as a badge
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <View className={cx(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
