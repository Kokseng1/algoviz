import React, { useEffect, useState } from "react";
import "./SortedBinaryTree.css";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const BinaryTree = () => {
  const [root, setRoot] = useState(null);
  const [searchedNode, setSearchedNode] = useState(null);
  const [searchedNodeInput, setSearchedNodeInput] = useState("");
  const [deletedNode, setDeletedNode] = useState(null);
  const [deletedNodeInput, setDeletedNodeInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [range, setRange] = useState({ min: "", max: "" });

  const insertNode = (node, value) => {
    if (!node) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }
    var newNode = new TreeNode(node.value);
    newNode.left = node.left;
    newNode.right = node.right;
    return newNode;
  };

  const handleAdd = (value) => {
    if (value !== null) {
      setRoot((prevRoot) => insertNode(prevRoot, value));
      setInputValue("");
    }
  };

  const handleSearch = (node, searchValue) => {
    if (!node) {
      console.log("not found!");
      return;
    }
    if (node.value == searchValue) {
      setSearchedNode(node);
      return;
    }

    if (searchValue < node.value) {
      handleSearch(node.left, searchValue);
    }

    if (searchValue > node.value) {
      handleSearch(node.right, searchValue);
    }
  };

  const handleDelete = () => {
    setRoot((r) => deleteNode(r, deletedNodeInput));
    setDeletedNodeInput("");
  };

  const deleteNode = (node, value) => {
    if (!node) {
      return;
    }

    if (node.value > value) {
      node.left = deleteNode(node.left, value);
    }

    if (node.value < value) {
      node.right = deleteNode(node.right, value);
    }
    if (node.value == value) {
      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      var minimumnode = getMinimumNode(node.right);
      node.value = minimumnode.value;
      node.right = deleteNode(node.right, minimumnode.value);
    }
    return node;
  };

  const getMinimumNode = (node) => {
    if (!node.left) {
      return node;
    }

    return getMinimumNode(node.left);
  };

  const handleMinMaxChange = (key, value) => {
    setRange((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddRandomNode = () => {
    var randomNum =
      Math.floor(Math.random() * (Number(range.max) - Number(range.min) + 1)) +
      Number(range.min);
    handleAdd(randomNum);
  };

  useEffect(() => {
    const demoValues = [];
    demoValues.forEach((val) => handleAdd(val));
  }, []);

  return (
    <div>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd(inputValue);
        }}
        placeholder="Enter a number"
      />
      <button onClick={() => handleAdd(inputValue)}>Add to Tree</button>
      <input
        type="number"
        value={searchedNodeInput}
        onChange={(e) => setSearchedNodeInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch(root, searchedNodeInput);
        }}
        placeholder="search for a node"
      />
      <button onClick={() => handleSearch(root, searchedNodeInput)}>
        Search
      </button>
      <input
        type="number"
        value={deletedNodeInput}
        onChange={(e) => setDeletedNodeInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleDelete();
          }
        }}
        placeholder="Delete a node"
      />
      <button onClick={handleDelete}>Delete</button>
      <br></br>
      <label>
        Min Value:
        <input
          type="number"
          value={range.min}
          onChange={(e) => handleMinMaxChange("min", e.target.value)}
        />
      </label>
      <label>
        Max Value:
        <input
          type="number"
          value={range.max}
          onChange={(e) => handleMinMaxChange("max", e.target.value)}
        />
      </label>
      <button onClick={handleAddRandomNode}>Add random node</button>
      <div className="childnode-container">
        <TreeDisplay node={root} searchedNode={searchedNode} />
      </div>
    </div>
  );
};

const TreeDisplay = ({ node, searchedNode }) => {
  if (!node) {
    return (
      <div
        className="tree-container"
        style={{
          marginLeft: "20px",
          padding: "10px",
        }}
      ></div>
    );
  }

  return (
    <div
      className="tree-container"
      style={{
        marginLeft: "5px",
        marginRight: "5px",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <div
        className="node-value"
        style={{
          backgroundColor: node === searchedNode ? "red" : "",
        }}
      >
        {node.value}
      </div>
      <motion.svg
        width="100%"
        height="60"
        viewBox="0 0 600 100"
        style={{
          // border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <motion.line
          x1="300"
          y1="0"
          x2="0"
          y2="100"
          stroke="#00cc88"
          strokeWidth="7"
        />
      </motion.svg>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "",
        }}
      >
        <div>
          <div className="childnode-container">
            <TreeDisplay node={node.left} searchedNode={searchedNode} />
          </div>
        </div>
        <div>
          <div className="childnode-container">
            <TreeDisplay node={node.right} searchedNode={searchedNode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;
