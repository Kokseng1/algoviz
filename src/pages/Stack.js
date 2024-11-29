import { useState } from "react";
import "./Stack.css";

const Stack = () => {
  const [items, setItems] = useState(["second demo", "first demo"]);
  const [currAddInput, setcurrAddInput] = useState("");
  const [lastPop, setLastPop] = useState("");

  const addItem = (item) => {
    if (currAddInput.trim() !== "") {
      setNewItem(currAddInput);
      setTimeout(() => {
        setItems([...items, currAddInput]);
        setNewItem(null);
        setcurrAddInput("");
      }, 500);
    }
  };
  const handleAddItemChange = (e) => {
    setcurrAddInput(e.target.value);
  };
  const popClick = () => {
    setLastPop(items[items.length - 1]);
    setItems(items.slice(0, items.length - 1));
  };

  return (
    <div className="main">
      <ul className="stack-list">
        {items.map((item, id) => (
          <li key={-id}>{item}</li>
        ))}
      </ul>
      <label className="add-container">
        Add item to stack :
        <input
          placeholder="stack item"
          value={currAddInput}
          onChange={(e) => handleAddItemChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addItem(currAddInput);
          }}
        />
        <button onClick={() => addItem(currAddInput)}>Add</button>
      </label>
      <div className="pop-container">
        <button onClick={() => popClick()}>Pop</button>
        <div className="lastPop"> Popped : {lastPop} </div>
      </div>
    </div>
  );
};

export default Stack;
