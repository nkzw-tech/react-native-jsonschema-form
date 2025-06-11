import { ComponentPropsWithRef, ComponentType } from 'react';
import { Text } from 'react-native';

export type TextComponent = ComponentType<ComponentPropsWithRef<typeof Text>>;

export default function pickComponent<T extends ComponentType<any>>(
  template:
    | ComponentType<any>
    | {
        [key: string]: ComponentType<any>;
      }
    | undefined,
  component: T,
): T {
  return typeof template === 'function' ? (template as T) : component;
}
