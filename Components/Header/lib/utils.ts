/**
 *
 * @param title sentence or word to transform into capitalize
 * @returns my blog => My Blog
 */
export const transformCase = (
  text: string,
  format: "small" | "capital" | "allcaps"
): string => {
  switch (format) {
    case "small":
      return text.toLowerCase();
    case "capital":
      return text.toUpperCase();
    case "allcaps":
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
