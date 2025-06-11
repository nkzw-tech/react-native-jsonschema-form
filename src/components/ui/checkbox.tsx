import { Indicator, Root } from '@rn-primitives/checkbox';
import { CheckIcon } from 'lucide-react-native';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { cx } from '../../lib/cx.tsx';

/**
 * A checkbox component built on top of Radix UI Checkbox primitive
 * Renders an interactive checkbox that can be either checked or unchecked
 * @see https://ui.shadcn.com/docs/components/checkbox
 *
 * @param props - Props extending Radix UI Checkbox primitive props
 * @param props.className - Additional CSS classes to apply to the checkbox
 * @param ref - Forward ref to access the underlying checkbox element
 */
const Checkbox = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => (
  <Root
    className={cx(
      'peer h-5 w-5 shrink-0 rounded-sm border border-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className,
    )}
    ref={ref}
    {...props}
  >
    <Indicator
      className={cx('flex-row items-center justify-center text-current')}
    >
      <CheckIcon size={16} />
    </Indicator>
  </Root>
));
Checkbox.displayName = Root.displayName;

export { Checkbox };
