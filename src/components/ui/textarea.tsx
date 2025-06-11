import { ComponentProps, forwardRef } from 'react';
import { TextInput } from 'react-native';
import { cx } from '../../lib/cx.tsx';

/**
 * Props for the Textarea component
 * @extends TextareaHTMLAttributes<HTMLTextAreaElement> - HTML textarea element attributes
 */
export type TextareaProps = ComponentProps<typeof TextInput>;

/**
 * A textarea component with styling and focus states
 *
 * @param props - The props for the Textarea component
 * @param props.className - Additional CSS classes to apply to the textarea
 * @param ref - The forwarded ref for the textarea element
 * @returns A styled textarea element
 */
const Textarea = forwardRef<TextInput, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextInput
        className={cx(
          'w-full flex-row rounded-md border border-input bg-transparent p-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
