import Link from "next/link";
import { BackButtonProps } from "../lib/types";

/**
 * BackButton Component
 *
 * Renders a styled link for navigation back to a specified route. It includes:
 * - Customizable text color via the `color` prop.
 * - A default `href` value of `".."` to navigate one level up in the directory structure.
 * - Error handling to ensure the `href` prop is always provided.
 *
 * @param {BackButtonProps} props - The properties for the BackButton component.
 * @param {string} props.href - The destination URL. Defaults to `".."` (parent directory).
 * @param {string} [props.color="text-blue-500"] - The CSS class for the button's text color.
 *
 * @returns {JSX.Element} The rendered BackButton component.
 *
 * @example
 * <BackButton href="/" color="text-red-500" />
 * // Renders: A red "Back to Posts" button linking to "/".
 *
 * @example
 * <BackButton />
 * // Renders: A blue "Back to Posts" button linking to the parent directory.
 */
export const BackButton = ({
  href = "..",
  color = "text-blue-500",
}: BackButtonProps) => {
  if (!href) {
    throw new Error("href value is required");
  }

  return (
    <Link
      href={href}
      className={`${color} hover:text-blue-700 font-semibold text-sm mb-4 inline-block`}
    >
      ← Back to Posts
    </Link>
  );
};
