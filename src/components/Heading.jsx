function Heading({ text, size = 1, color = "text-black" }) {
  const HeadingTag = `h${size}`;

  // Tailwind size mapping for each heading
  const sizeClasses = {
    1: "text-6xl",
    2: "text-5xl",
    3: "text-2xl",
    4: "text-xl",
    5: "text-lg",
    6: "text-base",
  };

  return (
    <HeadingTag className={`${sizeClasses[size]} ${color}`}>
      {text}
    </HeadingTag>
  );
}

export default Heading;
