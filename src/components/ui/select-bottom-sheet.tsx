import {
  BottomSheetScrollView,
  BottomSheetModal as OriginalBottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Check, ChevronDown, X } from 'lucide-react-native';
import { cssInterop } from 'nativewind';
import { ReactElement, useMemo, useRef } from 'react';
import { Pressable, View } from 'react-native';
import { TextComponent } from 'src/lib/getTextComponent.tsx';
import { cx } from '../../lib/cx.tsx';
import { Badge } from './badge.tsx';

const BottomSheetModal = cssInterop(OriginalBottomSheetModal, {
  className: {
    target: 'style',
  },
});

/**
 * Represents an item in the select bottom sheet.
 */
export type SelectItem = {
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
 * Props interface for the select bottom sheet component
 */
interface SelectInterface {
  /** ID of the element that describes this select */
  ariaDescribedby?: string;
  /** Aria placeholder text */
  ariaPlaceholder?: string;
  /** Additional className for styling */
  className?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Array of items to display in the dropdown */
  items: SelectItem[] | undefined;
  /** Whether multiple items can be selected */
  multiple?: boolean;
  /** Callback function when value changes */
  onValueChange?: (value: any) => void;
  /** Placeholder text when no item is selected */
  placeholder?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Currently selected item value */
  selected: string | Array<string>;
}

/**
 * A select component that provides a bottom sheet.
 * @param props - The component props
 * @returns A React component that renders a searchable select dropdown
 */
export function SelectBottomSheet({
  ariaDescribedby,
  ariaPlaceholder,
  className,
  disabled = false,
  items,
  multiple = false,
  onValueChange,
  placeholder = 'Select...',
  required = false,
  selected,
  textComponent: TextComponent,
}: Readonly<SelectInterface> &
  Readonly<{
    textComponent: TextComponent;
  }>): ReactElement {
  const bottomSheetRef = useRef<OriginalBottomSheetModal>(null);
  const selectedSet = useMemo(
    () => new Set(Array.isArray(selected) ? selected : [selected]),
    [selected],
  );
  const selectedItems =
    items?.filter(({ value }) => selectedSet.has(value)) || [];
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
          'w-full flex-row items-center justify-between gap-1 rounded-md border border-input bg-transparent p-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          !selectedItems.length && required && 'border-red-500',
          className,
        )}
        onPress={() => !disabled && bottomSheetRef.current?.present()}
      >
        {selectedItems.length ? (
          <View className="flex-1 flex-row flex-wrap items-center gap-2">
            {multiple ? (
              selectedItems.map((item) => (
                <Badge key={item.value}>
                  <TextComponent className="line-clamp-1">
                    {item.label}
                  </TextComponent>
                  {!disabled ? (
                    <Pressable
                      className="active:opacity-50"
                      hitSlop={4}
                      onPress={() => {
                        const set = new Set(selectedSet);
                        set.delete(item.value);
                        onValueChange?.([...set]);
                      }}
                    >
                      <X size={12} />
                    </Pressable>
                  ) : null}
                </Badge>
              ))
            ) : (
              <TextComponent className="line-clamp-1">
                {selectedItems[0].label}
              </TextComponent>
            )}
          </View>
        ) : !disabled ? (
          <TextComponent className="line-clamp-1 text-muted-foreground">
            {placeholder}
          </TextComponent>
        ) : null}
        <View className="shrink-0 opacity-50">
          {!disabled && <ChevronDown className="h-4 w-4" />}
        </View>
      </Pressable>
      {items && items.length > 0 ? (
        <BottomSheetModal
          className="border-input bg-popover"
          ref={bottomSheetRef}
          snapPoints={['50%']}
        >
          <BottomSheetScrollView>
            <View className="flex-1 flex-col items-start justify-start gap-4 p-4 pb-10">
              {items.map((item) => {
                const isSelected = selectedSet.has(item.value);
                return (
                  <Pressable
                    className={cx(
                      'w-full cursor-pointer flex-row items-center justify-between gap-2 rounded-sm py-1.5 active:opacity-50',
                      isSelected && 'font-semibold',
                      item.disabled && 'cursor-not-allowed opacity-50',
                    )}
                    hitSlop={8}
                    key={item.value}
                    onPress={() => {
                      if (!item.disabled) {
                        if (multiple) {
                          const set = new Set(selectedSet);
                          set[set.has(item.value) ? 'delete' : 'add'](
                            item.value,
                          );
                          onValueChange?.([...set]);
                        } else {
                          onValueChange?.(item.value);
                        }

                        if (!multiple) {
                          bottomSheetRef.current?.dismiss();
                        }
                      }
                    }}
                  >
                    <TextComponent>{item.label}</TextComponent>
                    <TextComponent className="h-4 w-4 flex-row items-center justify-center">
                      {isSelected && <Check className="h-4 w-4" />}
                    </TextComponent>
                  </Pressable>
                );
              })}
            </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
      ) : null}
    </View>
  );
}
