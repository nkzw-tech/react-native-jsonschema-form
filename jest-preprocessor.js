import { readFileSync } from 'node:fs';
import babel from '@babel/core';
import presetReact from '@babel/preset-react';
import presetTypescript from '@babel/preset-typescript';

const createTransformer = (opts = {}) => ({
  process: (src, filename) => {
    if (filename.endsWith('node_modules/react-native/index.js')) {
      return {
        code: readFileSync(process.cwd() + '/mocks/react-native.js', 'utf8'),
      };
    }
    if (
      filename.endsWith(
        'node_modules/lucide-react-native/dist/cjs/lucide-react-native.js',
      )
    ) {
      return {
        code: readFileSync(
          process.cwd() + '/mocks/lucide-react-native.js',
          'utf8',
        ),
      };
    }
    if (filename.endsWith('react-native-css-interop/dist/doctor.js')) {
      return { code: '' };
    }

    if (
      filename.endsWith(
        'node_modules/@react-native-community/slider/dist/index.js',
      ) ||
      filename.endsWith(
        'node_modules/@react-native-community/slider/dist/Slider.js',
      )
    ) {
      return {
        code: readFileSync(process.cwd() + '/mocks/slider.js', 'utf8'),
      };
    }

    if (filename.includes('node_modules/@gorhom/bottom-sheet')) {
      return {
        code: readFileSync(process.cwd() + '/mocks/bottom-sheet.js', 'utf8'),
      };
    }

    return babel.transform(src, {
      filename,
      presets: [
        ...(opts?.presets || []),
        [
          presetReact,
          {
            runtime: filename.includes('node_modules')
              ? 'classic'
              : 'automatic',
          },
        ],
        presetTypescript,
      ],
      retainLines: true,
    });
  },
});

export default {
  ...createTransformer(),
  createTransformer,
};
