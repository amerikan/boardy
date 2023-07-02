// DOM Element creation helper
export function el(type, props) {
  const newEl = document.createElement(type);

  if (props) {
    Object.assign(newEl, props);

    const styles = props?.style;

    // Handle inline style
    if (styles) {
      for (const style in styles) {
        if (Object.hasOwn(styles, style)) {
          newEl.style[style] = styles[style];
        }
      }
    }
  }

  return newEl;
}
