import { el } from "../utils";

function SizeOptions() {
  const sizes = [2, 5, 7, 10];

  return sizes.map((size) =>
    el(
      "option",
      {
        value: size,
      },
      size
    )
  );
}

export default function ({ onchange }) {
  return el(
    "select",
    {
      onchange,
    },
    ...SizeOptions()
  );
}
