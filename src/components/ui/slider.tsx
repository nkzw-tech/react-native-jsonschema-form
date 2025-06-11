import NativeSlider from '@react-native-community/slider';
import { cssInterop } from 'nativewind';
import { ComponentProps } from 'react';
import { View } from 'react-native';
import { cx } from '../../lib/cx.tsx';

export const NativeWindSlider = cssInterop(NativeSlider, {
  className: {
    target: 'style',
  },
});

/**
 * A slider component for selecting a numeric value within a range
 *
 * @param props - The props for the Slider component
 * @param props.className - Additional CSS classes to apply to the slider
 * @param ref - The forwarded ref for the slider element
 * @returns A slider input element with track and thumb
 */
const Slider = ({
  className,
  ...props
}: ComponentProps<typeof NativeWindSlider>) => (
  <View className="w-full flex-row">
    <NativeWindSlider className={cx('w-[240px]', className)} {...props} />
  </View>
);

Slider.displayName = 'Slider';

export { Slider };
