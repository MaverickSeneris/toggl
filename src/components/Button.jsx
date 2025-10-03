export default function Button({ children, handler, position }) {
  return (
    <button
      onClick={handler}
      className={`border-4 border-neutral-800 rounded-2xl ${position}`}
    >
      {children}
    </button>
  );
}
