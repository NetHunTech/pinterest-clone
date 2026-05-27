import Button from "../ui/Button";

export default function PinCard({ img }: { img: string }) {
  return (
    <div className="relative break-inside-avoid group cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm">
      
      {/* IMAGE */}
      <img
        className="w-full object-cover group-hover:scale-105 transition duration-300"
        src={img}
        alt=""
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition">

        {/* SAVE BUTTON */}
        <Button variant="save">
          Save
        </Button>

        {/* TEXT */}
        <div className="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition">
          <h1 className="font-bold text-sm">Title</h1>
          <h2 className="text-xs opacity-80">Author</h2>
        </div>

      </div>
    </div>
  );
}