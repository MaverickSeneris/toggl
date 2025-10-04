export default function Button({ children, handler, position }) {
  return (
    <button
      onClick={handler}
      className={`border-4 border-[#4F5858] rounded-2xl ${position}`}
    >
      {children}
    </button>
  );
}
