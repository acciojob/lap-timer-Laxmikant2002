
import React, { useState, useEffect, useRef, use } from "react";
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  const padNumber = (num) => {
    return num.toString().padStart(2, '0');
  };

  const formatTime = (centiseconds) => {
    const totalSeconds = Math.floor(centiseconds / 100);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const cs = centiseconds % 100;

    return `${padNumber(minutes)}:${padNumber(seconds)}:${padNumber(cs)}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10);
    }
  };

  const handleStop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps(prevLaps => [...prevLaps, time]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <div className="timer-display">
        {formatTime(time)}
      </div>

      <div className="controls">
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={handleLap} disabled={!isRunning}>
          Lap
        </button>
        <button onClick={handleReset} disabled={!isRunning}>
          Reset
        </button>
      </div>

      {laps.length > 0 && (
        <div className="laps-list">
          <ul>
            {laps.map((lapTime, index) => (
              <li key={index}>
                {formatTime(lapTime)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;