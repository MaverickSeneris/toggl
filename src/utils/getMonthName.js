export default function getCurrentMonthName() {
  const now = new Date();
  return now.toLocaleString("default", { month: "long" });
}