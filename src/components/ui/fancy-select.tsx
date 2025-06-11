import {
  BottomSheetScrollView,
  BottomSheetModal as OriginalBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Check, ChevronDown } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { ReactElement, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { TextComponent } from 'src/lib/getTextComponent.tsx';
import { cx } from '../../lib/cx.tsx';

const BottomSheetModal = cssInterop(OriginalBottomSheetModal, {
  className: {
    target: 'style',
  },
});

/**
 * Represents an item in the fancy select dropdown
 */
export type FancySelectItem = {
  /** Whether the item is disabled */
  disabled?: boolean;
  /** The index position of the item */
  index: number;
  /** The display label for the item */
  label: string;
  /** The value of the item */
  value: any;
};

/**
 * Props interface for the FancySelect component
 */
interface FancySelectInterface {
  /** ID of the element that describes this select */
  ariaDescribedby?: string;
  /** Aria placeholder text */
  ariaPlaceholder?: string;
  /** Additional className for styling */
  className?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Array of items to display in the dropdown */
  items: FancySelectItem[] | undefined;
  /** Callback function when value changes */
  onValueChange?: (value: any) => void;
  /** Placeholder text when no item is selected */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Currently selected item value */
  selected: string;
}

/**
 * A fancy select component that provides a styled dropdown with search functionality
 * @param props - The component props
 * @returns A React component that renders a searchable select dropdown
 */
export function FancySelect({
  ariaDescribedby,
  ariaPlaceholder,
  className,
  disabled = false,
  items,
  onValueChange,
  placeholder = 'Select...',
  required = false,
  selected,
  textComponent: TextComponent,
}: Readonly<FancySelectInterface> &
  Readonly<{
    textComponent: TextComponent;
  }>): ReactElement {
  const bottomSheetRef = useRef<OriginalBottomSheetModal>(null);
  const selectedItem = items?.find((item) => item.value === selected);
  const containerRef = useRef<View>(null);

  return (
    <View
      aria-describedby={ariaDescribedby}
      aria-disabled={disabled}
      aria-placeholder={ariaPlaceholder}
      className={cx('bg-transparent', className)}
      ref={containerRef}
    >
      <Pressable
        className={cx(
          'h-9 w-full flex-row items-center justify-between gap-2 whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          !selectedItem && required && 'border-red-500',
          disabled && 'cursor-not-allowed opacity-50',
          className,
        )}
        onPress={() => !disabled && bottomSheetRef.current?.present()}
      >
        <TextComponent
          className={cx(
            'line-clamp-1 flex-1',
            !selectedItem && 'text-muted-foreground',
          )}
        >
          {selectedItem?.label || placeholder}
        </TextComponent>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </Pressable>
      {items && items.length > 0 ? (
        <BottomSheetModal
          className="border-input bg-popover"
          ref={bottomSheetRef}
          snapPoints={['50%']}
        >
          <BottomSheetScrollView>
            <View className="flex-1 flex-col items-start justify-start gap-4 p-4 pb-10">
              {items.map((item) => (
                <Pressable
                  className={cx(
                    'w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-sm py-1.5',
                    item.value === selected && 'font-semibold',
                    item.disabled && 'cursor-not-allowed opacity-50',
                  )}
                  key={item.value}
                  onPress={() => {
                    if (!item.disabled) {
                      onValueChange?.(item.value);
                      bottomSheetRef.current?.dismiss();
                    }
                  }}
                >
                  <TextComponent>{item.label}</TextComponent>
                  <TextComponent className="h-4 w-4 flex-row items-center justify-center">
                    {item.value === selected && <Check className="h-4 w-4" />}
                  </TextComponent>
                </Pressable>
              ))}
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      ) : null}
    </View>
  );
}
