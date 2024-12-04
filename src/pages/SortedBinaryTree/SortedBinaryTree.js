import React, { useEffect, useRef, useState } from "react";
import "./SortedBinaryTree.css";
import { motion } from "framer-motion";

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
  const [showRandomMinMaxInput, setShowRandomMinMaxInput] = useState(false);
  const [deletedNodeInput, setDeletedNodeInput] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [range, setRange] = useState({ min: "", max: "" });
  const [scale, setScale] = useState(1);
  const [addRandomErrorMessage, setAddRandomErrorMessage] = useState("");

  const calculateScale = () => {
    const pageContainer = document.getElementById("page-container");
    const treenode = document.getElementById("treenode");
    const treeContainer = document.getElementById("tree-container");
    const scaleY = (pageContainer.offsetWidth / treenode.offsetWidth) * 0.9;
    setScale(scaleY);

    if (treeContainer) {
      treeContainer.scrollLeft = treeContainer.offsetWidth;
    }
  };

  useEffect(() => {
    window.addEventListener("resize", calculateScale);
    calculateScale();

    return () => {
      window.removeEventListener("resize", calculateScale);
    };
  }, [root]);

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
      setRoot((prevRoot) => insertNode(prevRoot, Number(value)));
      setInputValue("");
    }
  };

  const handleSearch = (node, searchValue) => {
    if (!node) {
      console.log("not found!");
      return;
    }
    if (searchValue && node.value === searchValue) {
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
    if (node.value === value) {
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
    if (range.max <= range.min) {
      setAddRandomErrorMessage("Invalid random node range");
      return;
    }
    setAddRandomErrorMessage("");
    var randomNum =
      Math.floor(Math.random() * (Number(range.max) - Number(range.min) + 1)) +
      Number(range.min);
    handleAdd(randomNum);
  };

  const toggleShowRandomMinMaxInput = () => {
    setShowRandomMinMaxInput((p) => !p);
  };

  useEffect(() => {
    const demoValues = [];
    demoValues.forEach((val) => handleAdd(val));
  }, []);

  return (
    <div className="w-screen">
      <div
        id="page-container"
        style={{
          maxWidth: "100%",
          padding: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          // border: "1px solid #ccc",
        }}
      >
        <div
          className="input-fields"
          style={{
            border: "1px solid #ccc",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignContent: "center",
            width: "400px",
            height: "300px",
          }}
        >
          <div className="add-node">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd(inputValue);
              }}
              placeholder="Node value"
            />
            <button onClick={() => handleAdd(inputValue)}>Add to Tree</button>
          </div>
          <div className="search-node">
            <input
              type="number"
              value={searchedNodeInput}
              onChange={(e) => setSearchedNodeInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch(root, searchedNodeInput);
              }}
              placeholder="Search for a node"
            />
            <button onClick={() => handleSearch(root, searchedNodeInput)}>
              Search
            </button>
          </div>
          <div className="delete-node">
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
          </div>

          <div
            style={{
              position: "relative",
              width: "500px",
              margin: "12px",
            }}
          >
            <button onClick={toggleShowRandomMinMaxInput}>
              Add random node
            </button>
            {showRandomMinMaxInput && (
              <div
                className="min-max-input"
                style={{
                  zIndex: 9999,
                  flexDirection: "column",
                  position: "absolute",
                  left: "0",
                  padding: "10px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <label>
                  Min Value:
                  <input
                    type="number"
                    className="w-20"
                    value={range.min}
                    onChange={(e) => handleMinMaxChange("min", e.target.value)}
                  />
                </label>
                <label>
                  Max Value:
                  <input
                    type="number"
                    className="w-20"
                    value={range.max}
                    onChange={(e) => handleMinMaxChange("max", e.target.value)}
                  />
                </label>
                <div style={{ height: "30px", position: "relative" }}>
                  <button
                    onClick={handleAddRandomNode}
                    style={{
                      height: "30px",
                      alignSelf: "center",
                    }}
                  >
                    Add
                  </button>
                </div>
                {addRandomErrorMessage && (
                  <div
                    class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-2"
                    role="alert"
                  >
                    <span class="block sm:inline">{addRandomErrorMessage}</span>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                      <svg
                        class="fill-current h-6 w-6 text-red-500"
                        role="button"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      ></svg>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div
          id="tree-container"
          style={{
            width: "100%",
            // border: "1px solid #ccc",
            overflowX: "auto",
          }}
        >
          <div
            id="treenode"
            style={{
              minWidth: "max-content",
              transform: `scale(${scale})`,
              transformOrigin: "top",
              transition: "transform 0.2s ease-out",
            }}
          >
            <TreeDisplay node={root} searchedNode={searchedNode} />
          </div>
        </div>
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
        // border: "1px solid #ccc",
        // padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        height="100"
        style={{
          // border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {node.left && (
          <motion.line
            x1="50%"
            y1="0"
            x2="25%"
            y2="100"
            stroke="#00cc88"
            strokeWidth="2"
          />
        )}
        {node.right && (
          <motion.line
            x1="50%"
            y1="0"
            x2="75%"
            y2="100%"
            stroke="#00cc88"
            strokeWidth="2"
          />
        )}
      </motion.svg>

      <div
        className="children-container"
        style={{
          display: "flex",
          minWidth: "90%",
          flexDirection: " row",
          // border: "1px solid blue",
          alignItems: "",
        }}
      >
        <div
          // ref={leftChildRef}
          style={{ justifySelf: "flex-start", width: "50%" }}
        >
          <div className="childnode-container">
            <TreeDisplay node={node.left} searchedNode={searchedNode} />
          </div>
        </div>
        <div
          // ref={rightChildRef}
          style={{ justifySelf: "flex-end", width: "50%" }}
        >
          <div className="childnode-container">
            <TreeDisplay node={node.right} searchedNode={searchedNode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinaryTree;
