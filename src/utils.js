// DOM Element creation helper
export function el(type) {
  return document.createElement(type);
}

// Add styles in mass helper
export function addStyles(el, styles) {
  for (var style in styles) {
    el.style[style] = styles[style];
  }

  return el;
}
