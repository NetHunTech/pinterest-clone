type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "default" | "secondary" | "ghost" | "remove" | "save" | "saved" | "auth";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  variant = "default",
  children,
  onClick,
}: ButtonProps) {

  const variants = {
    default: "bg-gray-200 text-black py-1 px-3 rounded-full border-black border-1 cursor-pointer hover:bg-gray-300 hover:border-none",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    ghost: "bg-transparent text-white hover:bg-white/10",
    remove: "bg-red-500 text-white hover:bg-red-600 px-3 py-1 rounded-full text-sm",
    save: "absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition cursor-pointer",
    saved: "absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm cursor-pointer",
    auth: "w-full bg-black text-white p-3 rounded-xl hover:opacity-90 transition cursor-pointer"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${variants[variant]}`}
    >
      {children}
    </button>
  );
}