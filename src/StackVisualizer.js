// import React, { useState } from 'react';
// import './StackVisualizer.css';

// function StackVisualizer() {
//   const [stack, setStack] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [logs, setLogs] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [redoHistory, setRedoHistory] = useState([]);

//   const handlePush = () => {
//     if (!inputValue.trim()) return;
//     const newStack = [inputValue, ...stack]; // Push from top (visually)
//     setHistory([...history, stack]);
//     setRedoHistory([]);
//     setStack(newStack);
//     setLogs([`Pushed ${inputValue}`, ...logs]);
//     setInputValue('');
//   };

//   const handlePop = () => {
//     if (stack.length === 0) return;
//     const popped = stack[0];
//     const newStack = stack.slice(1);
//     setHistory([...history, stack]);
//     setRedoHistory([]);
//     setStack(newStack);
//     setLogs([`Popped ${popped}`, ...logs]);
//   };

//   const handleUndo = () => {
//     if (history.length === 0) return;
//     const prev = history[history.length - 1];
//     setRedoHistory([stack, ...redoHistory]);
//     setStack(prev);
//     setHistory(history.slice(0, history.length - 1));
//     setLogs([`Undo`, ...logs]);
//   };

//   const handleRedo = () => {
//     if (redoHistory.length === 0) return;
//     const next = redoHistory[0];
//     setHistory([...history, stack]);
//     setStack(next);
//     setRedoHistory(redoHistory.slice(1));
//     setLogs([`Redo`, ...logs]);
//   };

//   return (
//     <div className="container">
//       <div className="header">STACK </div>
//       <h4 style={{ textAlign: 'left' }}>A stack is a data structure that follows the "last in, first out" (LIFO) principle, meaning the last item added is the first one to be removed. It operates with key operations like push (adding an item) and pop (removing an item). A top pointer is used to keep track of the most recently added item in the stack.</h4>
//       <div className="controls">
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Enter item ;)" />
//         <button onClick={handlePush}>Push</button>
//         <button onClick={handlePop}>Pop</button>
//         <button onClick={handleUndo}>Undo</button>
//         <button onClick={handleRedo}>Redo</button>
//       </div>
//       <div className="main">
//         <div className="stack">
//           <div className="top-pointer">
//             {stack.length > 0 ? `Top → ${stack[0]}` : 'Stack is Empty'}
//           </div>
//           <div className="stack-box">
//             {stack.length === 0 && <div className="empty">No elements</div>}
//             {stack.map((item, index) => (
//               <div
//                 key={index}
//                 className={`stack-item ${index === 0 ? 'top' : ''}`}
//               >
//                 {item}
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="log-box">
//           <h2>Operation History</h2>
//           <div className="log">
//             <ul>
//               {logs.map((log, index) => (
//                 <li key={index}>{log}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default StackVisualizer;

import React, { useState } from 'react';
import './StackVisualizer.css';

function StackVisualizer() {
  const [stack, setStack] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [logs, setLogs] = useState([]);
  const [history, setHistory] = useState([]);
  const [redoHistory, setRedoHistory] = useState([]);
  const [stackLimit, setStackLimit] = useState(null);
  const [sizeInput, setSizeInput] = useState('');
  const [popIndex, setPopIndex] = useState(null); // for animation

  const handleSetLimit = () => {
    const limit = parseInt(sizeInput);
    if (!isNaN(limit) && limit > 0) {
      setStackLimit(limit);
      setLogs([`Stack size set to ${limit}`, ...logs]);
    }
  };

  const handlePush = () => {
    if (!inputValue.trim()) return;

    if (stackLimit !== null && stack.length >= stackLimit) {
      setLogs([`Stack Overflow! Cannot push ${inputValue}`, ...logs]);
      setInputValue('');
      return;
    }

    const newStack = [inputValue, ...stack];
    setHistory([...history, stack]);
    setRedoHistory([]);
    setStack(newStack);
    setLogs([`Pushed ${inputValue}`, ...logs]);
    setInputValue('');
  };

  const handlePop = () => {
    if (stack.length === 0) {
      setLogs([`Stack Underflow! Cannot pop`, ...logs]);
      return;
    }

    setPopIndex(0); // animate top element
    setTimeout(() => {
      const popped = stack[0];
      const newStack = stack.slice(1);
      setHistory([...history, stack]);
      setRedoHistory([]);
      setStack(newStack);
      setLogs([`Popped ${popped}`, ...logs]);
      setPopIndex(null);
    }, 300); // match animation duration
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setRedoHistory([stack, ...redoHistory]);
    setStack(prev);
    setHistory(history.slice(0, history.length - 1));
    setLogs([`Undo`, ...logs]);
  };

  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const next = redoHistory[0];
    setHistory([...history, stack]);
    setStack(next);
    setRedoHistory(redoHistory.slice(1));
    setLogs([`Redo`, ...logs]);
  };

  return (
    <div className="container">
      <div className="header">STACK</div>
      <h4 style={{ textAlign: 'left' }}>
      A stack is a data structure that follows the "last in, first out" (LIFO) principle, meaning the last item added is the first one to be removed. It operates with key operations like push (adding an item) and pop (removing an item). A top pointer is used to keep track of the most recently added item in the stack. Push beyond size and Stack Overflow occurs. Pop despite emptiness and 'Stack Underflow' occurs.
      </h4>

      <div className="controls">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter item ;)"
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop}>Pop</button>
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <br /><br />
        <input
          type="number"
          placeholder="Stack size"
          value={sizeInput}
          onChange={(e) => setSizeInput(e.target.value)}
        />
        <button onClick={handleSetLimit}>Set Size</button>
      </div>

      <div className="main">
        <div className="stack">
          <div className="top-pointer">
            {stack.length > 0 ? `Top → ${stack[0]}` : 'Stack is Empty'}
          </div>
          <div className="stack-box">
            {stack.length === 0 && <div className="empty">No elements</div>}
            {stack.map((item, index) => (
              <div
                key={index}
                className={`stack-item ${
                  index === 0 ? 'top' : ''
                } ${index === popIndex ? 'pop-out' : ''}`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="log-box">
          <h2>Operation History</h2>
          <div className="log">
            <ul>
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StackVisualizer;
