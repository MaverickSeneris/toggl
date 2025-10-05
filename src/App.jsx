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

  const handleAddMonthCard = () => {
    const currentMonth = getMonthName(new Date().getMonth());
    if (month === currentMonth) {
      toast.error(`You already have ${currentMonth}!`);
      return;
    }
    setMonth(currentMonth);
    setDays(getDays(new Date().getMonth()));
    setDoneDays({});
    toast.success(`${currentMonth} added!`);
  };

  return (
    <div className="relative bg-[#2E383C] h-screen py-4 px-4">
      <div className="pb-10">
        <Heading text="togglr" size={1} color="text-[#dbbc7f]" />
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
          <div className="pb-6">
            <Heading text={month} size={2} color="text-[#a7c080]" />
          </div>
          <div>
            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => {
                return (
                  <div
                    onClick={() => toggleTask(day)}
                    key={day}
                    className={`border-2 border-[#e69875] rounded h-10 w-10 cursor-pointer ${
                      doneDays[month]?.[day] && "bg-[#e69875]"
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
