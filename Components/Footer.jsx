import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 p-6 mt-auto">
      <div className="container mx-auto text-center text-white">
        <p>&copy; {new Date().getFullYear()} - Todo App</p>
        <div className="mt-4 space-x-4">
          <Link href="/terms">
            <p className="text-white hover:text-blue-300">Terms & Conditions</p>
          </Link>
          <Link href="/privacy">
            <p className="text-white hover:text-blue-300">Privacy Policy</p>
          </Link>
          <Link href="/about">
            <p className="text-white hover:text-blue-300">About Us</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
