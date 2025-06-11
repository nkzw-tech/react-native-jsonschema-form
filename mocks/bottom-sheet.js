const { createElement } = require('react');

const BottomSheetModal = (props) =>
  createElement('BottomSheetModal', props, props.children);
const BottomSheetScrollView = (props) =>
  createElement('BottomSheetScrollView', props, props.children);

module.exports.BottomSheetModal = BottomSheetModal;
module.exports.BottomSheetScrollView = BottomSheetScrollView;
