import { transformCase } from "./Header/lib/utils";

type HeaderProps = {
  title: string;
  format: "small" | "capital" | "allcaps";
};

const Header = ({ title = "", format }: HeaderProps) => {
  title = transformCase(title, format);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo or Title */}
        <h1 className="text-xl font-bold">{title}</h1>

        {/* Optional Button or CTA */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Subscribe
        </button>
      </div>
    </header>
  );
};

export default Header;
