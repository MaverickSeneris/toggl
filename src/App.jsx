import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import Card from "./components/Card";
import Button from "./components/Button";
import Heading from "./components/Heading";
import { AiOutlinePlus } from "react-icons/ai";

import getDays from "./utils/getDays";
import getMonthName from "./utils/getMonthName";

function App() {
  // month with localStorage
  const [month, setMonth] = useState(() => {
    try {
      const saved = localStorage.getItem("month");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  // doneDays with localStoreage
  const [doneDays, setDoneDays] = useState(() => {
    try {
      const saved = localStorage.getItem("doneDays");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [days, setDays] = useState([]);

  // keep localStorage in sync
  useEffect(() => {
    localStorage.setItem("doneDays", JSON.stringify(doneDays));
  }, [doneDays]);

  useEffect(() => {
    localStorage.setItem("month", JSON.stringify(month));
    if (month) {
      // whenever month changes → regenerate days
      const totalDays = getDays();
      setDays(Array.from({ length: totalDays }, (_, i) => i + 1));
    }
  }, [month]);

  const today = new Date().getDate();
  const toggleTask = (day) => {
    if (day === today) {
      setDoneDays((prev) => ({
        ...prev,
        [month]: {
          ...prev[month],
          [day]: !prev[month]?.[day],
        },
      }));
    }
  };

  const handleAddMonthCard = () => {
    const currentMonth = getMonthName(new Date().getMonth());
    if (month === currentMonth) {
      toast.error(`You already have ${currentMonth}!`);
      return;
    }
    setMonth(currentMonth);
    setDays(getDays(new Date().getMonth()));
    setDoneDays((prev) => ({
      ...prev,
      [currentMonth]: {},
    }));

    toast.success(`${currentMonth} added!`);
  };

  const currentMonthDone = doneDays[month] || {}; // fallback if month not in object
  const doneCount = Object.keys(currentMonthDone).length;

  return (
    <div className="relative bg-[#2E383C] h-screen py-4 px-4">
      <div className="pb-10">
        <Heading text="togglr💪" size={1} color="text-[#dbbc7f]" />
      </div>

      <Button
        handler={handleAddMonthCard}
        position="bottom-4 right-4 absolute"
        aria-label="Add month"
      >
        <AiOutlinePlus size={60} className="text-[#4F5858]" />
      </Button>

      {month && (
        <Card>
          <div className="flex justify-between items-center pb-6">
            <Heading text={month} size={2} color="text-[#a7c080]" />
            <div className="text-xl font-semibold text-[#D3C6AA]">
              {Object.values(doneDays[month] || {}).filter(Boolean).length}/
              {days.length} 🔥
            </div>
          </div>
          <div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div
                  onClick={() => toggleTask(day)}
                  key={day}
                  className={`border-2 rounded h-10 w-10 cursor-pointer relative
    ${doneDays[month]?.[day] ? "bg-[#e69875]" : "bg-transparent"}
    ${day === today ? "border-red-400 shadow-md" : "border-[#e69875]"}
    active:scale-95 active:duration-150 active:ease-out
    transition-transform
  `}
                >
                  {/* Day number at bottom-right */}
                  <span
                    className={`absolute bottom-0 right-1 text-[0.65rem] text-[#D3C6AA] ${
                      doneDays[month]?.[day] && "text-gray-800"
                    }`}
                  >
                    {day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
