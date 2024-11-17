/**
 *
 * @param title sentence or word to transform into different cases small/all capital/only first letter capital
 * @returns my blog => My Blog
 */
export const transformCase = (
  text: string,
  format: "small" | "capital" | "allcaps"
): string => {
  switch (format) {
    case "small":
      return text.toLowerCase();
    case "allcaps":
      return text.toUpperCase();
    case "capital":
      //- Capitalize the first letter of each word
      return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    default:
      return text;
  }
};
