export default function Card({ children }) {
  return (
    <div className="max-w-100 py-6 px-4 bg-[#22282c] border border-[#374247] rounded-2xl">
      {children}
    </div>
  );
}
