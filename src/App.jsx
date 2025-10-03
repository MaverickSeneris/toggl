import { useState } from 'react'
import './App.css'

function App() {
 const [isDone, setIsDone] = useState(false);

function handleTask(){
    setIsDone(!isDone)
  }

  console.log(isDone)

 return(
 <>
   <div onClick={handleTask} className={`border-2 border-indigo-600 rounded h-8 w-8 ${isDone && 'bg-indigo-600'}`}>
    
   </div>
 </>
 )
}

export default App
