import Link from "next/link";
import { BackButtonProps } from "../lib/types";

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
