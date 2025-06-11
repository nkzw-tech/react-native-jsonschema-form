import { ComponentProps, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { cx } from '../../lib/cx.tsx';

export type InputProps = ComponentProps<typeof TextInput>;

/**
 * An input component with styling and focus states
 *
 * @param props - The props for the Input component
 * @param props.className - Additional CSS classes to apply to the input
 * @param props.type - The type of the input element
 * @param ref - The forwarded ref for the input element
 * @returns An input element with the specified styles and behavior
 */
const Input = forwardRef<TextInput, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        className={cx(
          'w-full flex-row rounded-md border border-input bg-transparent p-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
