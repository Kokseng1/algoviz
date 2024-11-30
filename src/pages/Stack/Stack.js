import { useRef, useState } from "react";
import "./Stack.css";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const Stack = () => {
  const [items, setItems] = useState(["second demo", "first demo"]);
  const [currAddInput, setcurrAddInput] = useState("");
  const [lastPop, setLastPop] = useState("");
  const lastItemRef = useRef(null);

  const addItem = (item) => {
    if (currAddInput.trim() !== "") {
      setItems([...items, item]);
      setcurrAddInput("");
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 0);
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
    <div className="main w-screen" style={{ border: "1px solid #ccc" }}>
      <div className="pop-container">
        <button className="pop-add-button" onClick={() => popClick()}>
          Pop
        </button>
        <div className="lastPop"> Popped : {lastPop} </div>
      </div>
      <ul className="stack-list">
        <MotionConfig>
          <AnimatePresence>
            {items.map((item, id) => (
              <motion.li
                initial={{
                  y: -30,
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: -30,
                }}
                key={id}
                ref={id === items.length - 1 ? lastItemRef : null}
              >
                {item}
              </motion.li>
            ))}
          </AnimatePresence>
        </MotionConfig>
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
        <button
          className="pop-add-button"
          onClick={() => addItem(currAddInput)}
        >
          Add
        </button>
      </label>
    </div>
  );
};

export default Stack;
