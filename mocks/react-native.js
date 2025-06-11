global.IS_REACT_NATIVE_TEST_ENVIRONMENT = true;

const { createElement } = require('react');

exports.Appearance = {
  addChangeListener: () => ({
    remove: () => {},
  }),
  getColorScheme: () => 'light',
  setColorScheme: () => {},
};
exports.AppState = {
  addEventListener: {
    remove: () => {},
  },
  currentState: () => {},
  removeEventListener: () => {},
};
exports.NativeEventSubscription = { remove: () => {} };
exports.PanResponder = {
  create: () => ({
    panHandlers: {},
  }),
};
exports.Pressable = (props) =>
  createElement('Pressable', props, props.children);
exports.Pressable.displayName = 'Pressable';
exports.processColor = (color) => color;
exports.Text = (props) => createElement('Text', props, props.children);
exports.Text.displayName = 'Text';
exports.TextInput = (props) =>
  createElement('TextInput', props, props.children);
exports.TextInput.displayName = 'TextInput';
exports.Touchable = {
  Mixin: {},
};
exports.View = (props) => createElement('View', props, props.children);
exports.View.displayName = 'View';
