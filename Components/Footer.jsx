import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-500 p-5 mt-auto">
      <div className="text-center text-white">
      <div className="flex flex-row text-center justify-center mt-4 space-x-4">
        <p>&copy; {new Date().getFullYear()} - Todo App</p>
        <p className="text-white hover:text-blue-300">Terms & Conditions</p>
        <p className="text-white hover:text-blue-300">Privacy Policy</p>
        <p className="text-white hover:text-blue-300">About Us</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
