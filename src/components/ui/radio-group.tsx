import { Indicator, Item, Root } from '@rn-primitives/radio-group';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { View } from 'react-native';
import { cx } from '../../lib/cx.tsx';

/**
 * A radio group component for selecting a single option from a list
 *
 * @param props - The props for the RadioGroup component
 * @param props.className - Additional CSS classes to apply to the radio group
 * @param ref - The forwarded ref for the radio group element
 * @returns A radio group container element
 */
const RadioGroup = forwardRef<
  ElementRef<typeof Root>,
  ComponentPropsWithoutRef<typeof Root>
>(({ className, ...props }, ref) => {
  return <Root className={cx('grid gap-3', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = Root.displayName;

/**
 * An individual radio item within a RadioGroup
 *
 * @param props - The props for the RadioGroupItem component
 * @param props.className - Additional CSS classes to apply to the radio item
 * @param ref - The forwarded ref for the radio item element
 * @returns A styled radio input element
 */
const RadioGroupItem = forwardRef<
  ElementRef<typeof Item>,
  ComponentPropsWithoutRef<typeof Item>
>(({ className, ...props }, ref) => {
  return (
    <Item
      className={cx(
        'aspect-square h-4 w-4 rounded-full border border-primary p-[2.5px] text-primary disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    >
      <Indicator className="flex-row items-center justify-center">
        <View className="h-2 w-2 rounded-full bg-accent" />
      </Indicator>
    </Item>
  );
});
RadioGroupItem.displayName = Item.displayName;

export { RadioGroup, RadioGroupItem };
