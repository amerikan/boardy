import { el } from "../../utils";

export default function ({ onclick }) {
  return el(
    "button",
    {
      onclick,
    },
    "x"
  );
}
