import { useState } from "react";
import Card from "./components/Card";
import getDays from "./utils/getDays";
import getMonthName from "./utils/getMonthName";
import { AiOutlinePlus } from "react-icons/ai";

function App() {
  const [isDone, setIsDone] = useState(false);
  const [month, setMonth] = useState(null);
  const [days, setDays] = useState([]);

  function handleTask() {
    setIsDone(!isDone);
  }

  function handleAddMonthCard() {
    const monthName = getMonthName();
    const totalDays = getDays();
    setMonth(monthName);
    setDays(Array.from({ length: totalDays }, (_, i) => i + 1));
  }

  return (
    <div className="bg-neutral-950 h-screen py-4 px-4">
      <h1 className="text-white text-6xl mb-10">Toggle</h1>

      <button
        onClick={handleAddMonthCard}
        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
      >
        <AiOutlinePlus size={20} />
        Add Month
      </button>

      {/* <Card>
        <h2 className="text-white text-5xl pb-8">October</h2>
        <div
          onClick={handleTask}
          className={`border-2 border-indigo-600 rounded h-8 w-8 ${
            isDone && "bg-indigo-600"
          }`}
        ></div>
      </Card> */}
    </div>
  );
}

export default App;
