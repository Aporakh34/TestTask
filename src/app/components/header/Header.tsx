import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-bold cursor-pointer text-white">
            Animal Catalog
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
