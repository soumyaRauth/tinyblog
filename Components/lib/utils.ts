/**
 *
 * @param title sentence or word to transform into different cases small/all capital/only first letter capital
 * @returns my blog => My Blog
 */

import { TransformCaseTypeProps } from "./types";

export const transformCase = ({ text, caseName }: TransformCaseTypeProps) => {
  const formatters = {
    small: () => text.toLocaleLowerCase(),
    title: () =>
      text
        .split(" ")
        .map(
          (word) => word.toLowerCase().charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" "),
    upper: () => text.toUpperCase(),
    default: () => text,
  };

  const transform = formatters[caseName];
  if (!transform) {
    throw new Error(
      `Invalid format: "${caseName}". Allowed formats are: ${Object.keys(
        formatters
      ).join(", ")}`
    );
  }
  return transform();
};


