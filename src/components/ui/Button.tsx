type ButtonProps = {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "danger" | "save" | "auth";
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({
  type = "button",
  variant = "primary",
  children,
  onClick,
}: ButtonProps) {

  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    ghost: "bg-transparent text-white hover:bg-white/10",
    danger: "bg-red-500 text-white hover:bg-red-600",
    save: "absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition",
    auth: "w-full bg-black text-white p-3 rounded-xl hover:opacity-90 transition"
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