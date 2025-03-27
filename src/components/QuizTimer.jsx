import { QuizContext } from "../context/QuizContext"
import { useContext, useEffect} from "react"


export const QuizTimer = () => {
  
  const {setTimeLeft, timeLeft, timeRun, setTimeRun} = useContext(QuizContext);
  
  
  useEffect(()=>{
    if(timeRun){
    const timer = setInterval(()=>{
      setTimeLeft((prevTime)=>{
        if (prevTime <= 0) {
          clearInterval(timer);
          console.log("time is up");
          setTimeRun(false)
          return 0;
        } else {
          return prevTime - 1000;
        }
      }) 
    },1000)
    return () => clearInterval(timer);
  }
  },[timeRun])

  return (
    <div className={`timer-container`} >{timeLeft/1000}</div>
  )
}
