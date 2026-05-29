import SearchInput from "../ui/SearchInput";
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="h-16 sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm flex items-center justify-between px-6">
      
      {/* LOGO + MENU */}
      <ul className="flex items-center gap-8 font-medium">
        <li><Link className="font-black text-xl" href="/">PinColne</Link></li>
        <li><Link className="text-gray-700 hover:text-black cursor-pointer" href="/">Home</Link></li>
        <li><Link className="text-gray-700 hover:text-black cursor-pointer" href="/explore">Explore</Link></li>
      </ul>

      {/* SEARCH */}
      <SearchInput />

      {/* PROFILE */}
      <Link className="w-10 h-10 rounded-full bg-pink-400" href="/profile"></Link>
    </nav>
  );
}