import {
  FormContextType,
  MultiSchemaFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
} from '@rjsf/utils';
import { View } from 'react-native';
import { cx } from './lib/cx.tsx';

export default function MultiSchemaFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({ optionSchemaField, selector }: MultiSchemaFieldTemplateProps<T, S, F>) {
  return (
    <View className={cx('rounded-md border bg-background p-4')}>
      <View className={cx('mb-4')}>{selector}</View>
      {optionSchemaField}
    </View>
  );
}
