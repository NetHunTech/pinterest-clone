export default function SearchInput() {
  return (
    <div className="flex-1 max-w-xl mx-8">
      <input
        type="text"
        placeholder="Search inspiration..."
        className="w-full bg-gray-100 px-5 py-3 rounded-full outline-none focus:ring-2 focus:ring-pink-300"
      />
    </div>
  )
}