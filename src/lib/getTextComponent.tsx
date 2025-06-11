import { ComponentProps, ComponentPropsWithRef, ComponentType } from 'react';
import { Text } from 'react-native';
import pickComponent from './pickComponent';

export type TextComponent = ComponentType<ComponentPropsWithRef<typeof Text>>;

export default function getTextComponent(
  template:
    | ComponentType<any>
    | {
        [key: string]: ComponentType<any>;
      }
    | undefined,
): ComponentType<ComponentProps<typeof Text>> {
  return pickComponent(template, Text);
}
