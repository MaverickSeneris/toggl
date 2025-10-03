import { useState } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import { AiOutlinePlus } from "react-icons/ai";

import getDays from "./utils/getDays";
import getMonthName from "./utils/getMonthName";

function App() {
  const [doneDays, setDoneDays] = useState({});
  const [month, setMonth] = useState(null);
  const [days, setDays] = useState([]);

  const toggleTask = (day) => {
    setDoneDays((prev) => ({
      ...prev,
      [day]: !prev[day], // flip just that day
    }));
  };

  function handleAddMonthCard() {
    const monthName = getMonthName();
    const totalDays = getDays();
    setMonth(monthName);
    setDays(Array.from({ length: totalDays }, (_, i) => i + 1));
  }

  return (
    <div className="relative bg-neutral-950 h-screen py-4 px-4">
      <h1 className="text-white text-6xl mb-10">toggl</h1>

      <Button
        handler={handleAddMonthCard}
        position={"bottom-4 right-4 absolute "}
      >
        <AiOutlinePlus size={60} className="text-neutral-800" />
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
                    className={`border-2 border-indigo-600 rounded h-10 w-10 ${
                      doneDays[day] && "bg-indigo-600"
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
