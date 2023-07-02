// DOM Element creation helper
export function el(type, props, ...children) {
  const newEl = document.createElement(type);

  if (props) {
    Object.assign(newEl, props);

    // Handle inline style
    if (props?.style) {
      Object.assign(newEl.style, props.style);
    }
  }

  newEl.append(...children);

  return newEl;
}
