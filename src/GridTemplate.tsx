import { GridTemplateProps } from '@rjsf/utils';
import { View } from 'react-native';
import { cx } from './lib/cx.tsx';

/** Renders a `GridTemplate` for mui, which is expecting the column sizing information coming in via the
 * extra props provided by the caller, which are spread directly on the `Grid2`.
 *
 * @param props - The GridTemplateProps, including the extra props containing the mui grid positioning details
 */
export default function GridTemplate(props: GridTemplateProps) {
  const { children, className, column, ...rest } = props;
  return (
    <View className={cx('grid gap-2', className)} {...rest}>
      {children}
    </View>
  );
}
