import { el } from "../../utils";

export default function DeleteButton({ onclick }) {
  return el(
    "button",
    {
      onclick,
    },
    "x"
  );
}
