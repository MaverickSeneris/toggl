//Get days in current month
export default function daysInCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec

  // Trick: set day=0 of next month → gives last day of current month
  return new Date(year, month + 1, 0).getDate();
}