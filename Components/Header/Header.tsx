import Link from "next/link";
import {
  TransformCaseFormatTypeProps,
  TransformCaseTypeProps,
} from "../lib/types";
import { transformCase } from "../lib/utils";

type HeaderProps = {
  title: string;
  caseName: TransformCaseFormatTypeProps;
};
/**
 *
 * @param {title:string,format:TransformCaseFormatTypeProps}
 * TransformCaseFormatTypeProps type values ="small" | "capital" | "allcaps" | "default"
 * @returns
 */
const Header = ({ title = "", caseName }: HeaderProps) => {
  const transformObject: TransformCaseTypeProps = {
    text: title,
    caseName: caseName,
  };

  /**
   * Transform the title according to the requested format
   */
  title = transformCase(transformObject);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo or Title */}
        <Link href="/">
          <h1 className="text-xl font-bold">{title}</h1>
        </Link>
        {/* Optional Button or CTA */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Portfolio
        </button>
      </div>
    </header>
  );
};

export default Header;
