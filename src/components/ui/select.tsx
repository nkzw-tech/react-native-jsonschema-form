import {
  Content,
  Group,
  Item,
  ItemIndicator,
  ItemText,
  Label,
  Portal,
  Root,
  ScrollDownButton,
  ScrollUpButton,
  Separator,
  Trigger,
  Value,
  Viewport,
} from '@rn-primitives/select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react-native';
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';
import { TextComponent } from 'src/lib/getTextComponent.tsx';
import { cx } from '../../lib/cx.tsx';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

/**
 * A select trigger component that displays the selected value and dropdown icon
 *
 * @param props - The props for the SelectTrigger component
 * @param props.className - Additional CSS classes to apply to the trigger
 * @param props.children - The content to display in the trigger
 * @param ref - The forwarded ref for the trigger element
 * @returns A styled select trigger button
 */
const SelectTrigger = ({
  children,
  className,
  ...props
}: ComponentProps<typeof Trigger>) => (
  <Trigger
    className={cx(
      'h-9 w-full flex-row items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
      className,
    )}
    {...props}
  />
);

const SelectScrollUpButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollUpButton>) => (
  <ScrollUpButton
    className={cx(
      'cursor-default flex-row items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </ScrollUpButton>
);

const SelectScrollDownButton = ({
  className,
  ...props
}: ComponentProps<typeof ScrollDownButton>) => (
  <ScrollDownButton
    className={cx(
      'cursor-default flex-row items-center justify-center py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </ScrollDownButton>
);

/**
 * A select content component that displays the dropdown menu
 *
 * @param props - The props for the SelectContent component
 * @param props.className - Additional CSS classes to apply to the content
 * @param props.children - The content to display in the dropdown
 * @param props.position - The position of the dropdown ('popper' | 'item-aligned')
 * @param ref - The forwarded ref for the content element
 * @returns A styled dropdown menu container
 */
const SelectContent = forwardRef<
  ElementRef<typeof Content>,
  ComponentPropsWithoutRef<typeof Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <Portal>
    <Content
      className={cx(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      ref={ref}
      {...props}
    >
      <SelectScrollUpButton />
      <Viewport
        className={cx(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </Viewport>
      <SelectScrollDownButton />
    </Content>
  </Portal>
));
SelectContent.displayName = Content.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof Label>,
  ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => (
  <Label
    className={cx('px-2 py-1.5 text-sm font-semibold', className)}
    ref={ref}
    {...props}
  />
));
SelectLabel.displayName = Label.displayName;

const SelectItem = ({
  children,
  className,
  component: TextComponent,
  ...props
}: ComponentProps<typeof Item> &
  Readonly<{
    component: TextComponent;
  }>) => (
  <Item
    className={cx(
      'relative w-full cursor-default select-none flex-row items-center rounded-sm py-1.5 pe-8 ps-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    {...props}
  >
    <TextComponent className="absolute end-2 h-3.5 w-3.5 flex-row items-center justify-center">
      <ItemIndicator>
        <Check className="h-4 w-4" />
      </ItemIndicator>
    </TextComponent>
    <ItemText />
  </Item>
);

const SelectSeparator = forwardRef<
  ElementRef<typeof Separator>,
  ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    className={cx('-mx-1 my-1 h-px bg-muted', className)}
    ref={ref}
    {...props}
  />
));
SelectSeparator.displayName = Separator.displayName;

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
