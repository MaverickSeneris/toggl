import { useState, useEffect } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
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

  const toggleTask = (day) => {
    const today = new Date().getDate();

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

  function handleAddMonthCard() {
    const monthName = getMonthName();
    setMonth(monthName);
  }

  return (
    <div className="relative bg-[#2E383C] h-screen py-4 px-4">
      <h1 className="text-white text-6xl mb-10">toggl</h1>

      <Button
        handler={handleAddMonthCard}
        position={"bottom-4 right-4 absolute "}
      >
        <AiOutlinePlus size={60} className="text-[#4F5858]" />
      </Button>

      {month && (
        <Card>
          <h2 className="text-white text-5xl pb-8">{month}</h2>
          <div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                return (
                  <div
                    onClick={() => toggleTask(day)}
                    key={day}
                    className={`border-2 border-indigo-600 rounded h-10 w-10 cursor-pointer ${
                      doneDays[month]?.[day] && "bg-indigo-600"
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

export default App;
