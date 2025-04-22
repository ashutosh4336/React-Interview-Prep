import '../styles/folder-menu.css';
import React, { useState, useRef } from 'react';
import { FaFile, FaFolder } from 'react-icons/fa';

function Folder({ explorerData, handleInsertNode }) {
  const [expanded, setExpanded] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const inputRef = useRef(null);

  const handleNewBtnClick = (e, isFolder) => {
    e.stopPropagation();
    setExpanded(true);

    setShowInput((prevState) => {
      return {
        ...prevState,
        visible: true,
        isFolder,
      };
    });
  };

  const onAddFolder = (e, isFolder, itemId) => {
    if (e.keyCode === 13 && e.target.value) {
      setShowInput({ isFolder: null, visible: false });

      const itemName = e.target.value;

      handleInsertNode(itemId, itemName, isFolder);
    }
  };

  if (explorerData.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className='folder' key={explorerData.id}>
          <span onClick={() => setExpanded((ps) => !ps)}>
            <FaFolder /> {explorerData.name}
          </span>

          <div className='action-buttons'>
            <button onClick={(e) => handleNewBtnClick(e, true)}>
              <FaFolder /> <span className='plus-icon'>+</span>
            </button>
            <button onClick={(e) => handleNewBtnClick(e, false)}>
              <FaFile /> <span className='plus-icon'>+</span>
            </button>
          </div>
        </div>

        <div
          style={{
            display: expanded ? 'block' : 'none',
            paddingLeft: 25,
          }}
        >
          {showInput.visible ? (
            <input
              ref={inputRef}
              autoFocus
              type='text'
              placeholder={
                showInput.isFolder
                  ? 'Enter the folder name'
                  : 'Enter the file name'
              }
              onKeyDown={(e) =>
                onAddFolder(e, showInput.isFolder, explorerData.id)
              }
              onBlur={() =>
                setShowInput({
                  visible: false,
                  isFolder: null,
                })
              }
            />
          ) : null}

          {explorerData.items.map((exp) => {
            return (
              <Folder
                key={exp.id}
                explorerData={exp}
                handleInsertNode={handleInsertNode}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span className='file'>
        <FaFile />
        {explorerData.name}
      </span>
    );
  }
}

export default Folder;
