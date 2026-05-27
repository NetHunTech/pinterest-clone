import SearchInput from "../ui/SearchInput";

export default function Navbar() {
  return (
    <nav className="h-16 sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6">
      
      {/* LOGO + MENU */}
      <ul className="flex items-center gap-8 font-medium">
        <li className="font-black text-xl">PinClone</li>
        <li className="text-gray-700 hover:text-black cursor-pointer">Home</li>
        <li className="text-gray-700 hover:text-black cursor-pointer">Explore</li>
      </ul>

      {/* SEARCH */}
      <SearchInput />

      {/* PROFILE */}
      <div className="w-10 h-10 rounded-full bg-pink-400" />
    </nav>
  );
}