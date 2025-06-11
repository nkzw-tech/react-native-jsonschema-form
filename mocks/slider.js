const { createElement } = require('react');

module.exports = (props) => createElement('Slider', props, props.children);
module.exports.displayName = 'Slider';
