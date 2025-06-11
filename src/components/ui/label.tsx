import { cva, type VariantProps } from 'class-variance-authority';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import { View } from 'react-native';
import { TextComponent } from 'src/lib/getTextComponent.tsx';
import { cx } from '../../lib/cx.tsx';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

/**
 * A label component with styling variants
 *
 * @param props - The props for the Label component
 * @param props.className - Additional CSS classes to apply to the label
 * @param ref - The forwarded ref for the label element
 * @returns A styled label element
 */
const Label = forwardRef<
  ElementRef<typeof View>,
  ComponentPropsWithoutRef<typeof View> &
    VariantProps<typeof labelVariants> &
    Readonly<{
      textComponent: TextComponent;
    }>
>(({ children, className, textComponent: TextComponent, ...props }, ref) => (
  <View className={cx(labelVariants(), className)} ref={ref} {...props}>
    <TextComponent>{children}</TextComponent>
  </View>
));
Label.displayName = 'Label';

export { Label };
