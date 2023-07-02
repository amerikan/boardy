// DOM Element creation helper
export function el(type, props) {
  const newEl = document.createElement(type);

  if (props) {
    Object.assign(newEl, props);
  }

  return newEl;
}

// Add styles in mass helper
export function addStyles(el, styles) {
  for (var style in styles) {
    el.style[style] = styles[style];
  }

  return el;
}
