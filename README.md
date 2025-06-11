# React Native JSONSchema Form

An implementation of React JSONSchema Form for React Native using [Nativewind](https://www.nativewind.dev/) and [`rn-primitives`](https://rn-primitives.vercel.app/).

## Getting Started

Run:

```bash
npm install @nkzw/react-native-jsonschema-form @rjsf/core @rjsf/utils @rjsf/validator-ajv8 @react-native-community/slider
```

If you are not already using `@gorhom/bottom-sheet', you will also need to install it:

```bash
npm install @gorhom/bottom-sheet
```

You also have to wrap your app using a `<BottomSheetModalProvider />`:

```tsx
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <BottomSheetModalProvider>
      {/* Your app components */}
    </BottomSheetModalProvider>
  );
}
```

## Configuration

Set up the default theme via your `tailwind.config.ts` file. You can customize the colors as needed:

```tsx
export default {
  content: [
    // [...your config]
    // Add this line to the content array:
    './node_modules/@nkzw/react-native-jsonschema-form/**/*.{js,ts,tsx}',
  ],
  theme: {
    colors: {
      accent: {
        DEFAULT: '#008',
        foreground: '#fff',
      },
      border: '#111',
      destructive: {
        DEFAULT: '#800',
        foreground: '#fff',
      },
      foreground: '#111',
      input: '#111',
      muted: {
        DEFAULT: '#fff',
        foreground: '#111',
      },
      popover: {
        DEFAULT: '#111',
        foreground: '#111',
      },
      primary: {
        DEFAULT: '#111',
        foreground: '#111',
      },
      secondary: {
        DEFAULT: '#880',
        foreground: '#fff',
      },
    },
  },
};
```

## Usage

```js
import Form from '@nkzw/react-native-jsonschema-form;
import validator from '@rjsf/validator-ajv8';

const form = <Form
  schema={schema}
  uiSchema={uiSchema}
  validator={validator}
/>
```

### Customization

You might want to customize various form componenst or the `Text` component used in the form. You can do this by providing a custom `Text` component or other components via the `templates` prop:

```tsx
import Form from '@nkzw/react-native-jsonschema-form';
import Text from 'src/ui/Text.tsx';

const form = (
  <Form
    schema={schema}
    uiSchema={uiSchema}
    validator={validator}
    templates={{
      ButtonTemplates: {
        SubmitButton: CustomSubmitButton,
      },
      TextTemplate: Text,
    }}
  />
);
```
