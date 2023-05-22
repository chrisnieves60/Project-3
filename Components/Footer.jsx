import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-blue-950 p-5 mt-auto">
      <div className="text-center text-white">
      <div className="flex flex-row text-center justify-center mt-4 space-x-4 cursor-default">
        <p>&copy; {new Date().getFullYear()} - Todo App</p>
        <p className="text-white">Terms & Conditions</p>
        <p className="text-white">Privacy Policy</p>
        <p className="text-white">About Us</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
