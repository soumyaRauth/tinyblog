/**
 *
 * @param title sentence or word to transform into different cases small/all capital/only first letter capital
 * @returns my blog => My Blog
 */

import { TransformCaseTypeProps } from "./types";

export const transformCase = ({ text, format }: TransformCaseTypeProps) => {
  const formatters = {
    small: () => text.toLocaleLowerCase(),
    capital: () =>
      text
        .split(" ")
        .map(
          (word) => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
    allcaps: () => text.toUpperCase(),
    default: () => text,
  };

  const transform = formatters[format];
  return transform();
};
