import { useState, useEffect, useRef } from "react"

const Timer = () => {
  const minRef = useRef(null)
  const secRef = useRef(null)
  const [time, setTime] = useState({ 
    minute: "00", 
    second: "00"
  })
  const [start, setStart] = useState(false)
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let intervalID = null; 
    let curMin = time.minute === "" ? 0 : parseInt(time.minute) 
    let curSec = time.second === "" ? 0 : parseInt(time.second)

    if (start) {
      intervalID = setInterval(() => {
        let newMin = null;
        let newSec = null; 

        console.log(curMin, curSec)

        if (curSec !== 0) {
          newMin = curMin
          newSec = --curSec
        } else if (curSec === 0 && curMin !== 0) {
          newMin = --curMin
          newSec = 59 
        } else {
          newMin = 0
          newSec = 0
          setStart(false) 
          setComplete(true)
          clearInterval(intervalID)
        }

        newMin = newMin.toString().padStart(2, "0");
        newSec = newSec.toString().padStart(2, "0");

        setTime({
          minute: newMin, 
          second: newSec
        })
      }, 1000)
    }

    return () => clearInterval(intervalID)
  }, [time, start])

  const handleStart = () => {
    minRef.current.value = "";
    secRef.current.value = "";
    setStart(true)
    setComplete(false)
  }

  const handlePause = () => {
    setStart(!start)
  }

  const handleReset = () => {
    setTime({
      minute: "00", 
      second: "00"
    })
    setStart(false)
  }

  const handleBlur = () => {
    setTime({
      minute: minRef.current.value.toString().padStart(2, "0"), 
      second: secRef.current.value.toString().padStart(2, "0")
    })
  }

  return (
    <div>
      <h1>Timer</h1>
      <input type="number" ref={minRef} onBlur={handleBlur}/>
      <span>Minutes</span>
      <input type="number" ref={secRef} onBlur={handleBlur}/>
      <span>Seconds</span>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause / Resume</button>
      <button onClick={handleReset}>Reset</button>
      <h2>{time.minute}:{time.second}</h2>
      {
      complete 
      ? <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fres.cloudinary.com%2Fteepublic%2Fimage%2Fprivate%2Fs--sKuy4pjn--%2Fb_rgb%3Afffffe%2Ct_Heather%2520Preview%2Fc_limit%2Cf_jpg%2Ch_630%2Cq_90%2Cw_630%2Fv1533118006%2Fproduction%2Fdesigns%2F2964263_0.jpg&f=1&nofb=1&ipt=6ef0b2ecaff7b0e381545f9ce93ff8ee88079ee63210d3fbd117683af0bb26dc&ipo=images"/>
      : <></>
      }
    </div>
  )
}

export default Timer