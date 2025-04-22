import './App.css';
import { useState } from 'react';
import explorer from './data/folder-structure';
import Folder from './Components/Folder';

function insertNode(tree, folderId, item, isFolder) {
  // Base case: we found the matching folder
  if (tree.id === folderId && tree.isFolder) {
    const newItem = {
      id: Date.now().toString(),
      name: item,
      isFolder: isFolder,
      items: [],
    };
    return { ...tree, items: [newItem, ...tree.items] };
  }

  // Recursive case: go deeper into items
  if (tree.items && tree.items.length > 0) {
    return {
      ...tree,
      items: tree.items.map((child) =>
        insertNode(child, folderId, item, isFolder)
      ),
    };
  }

  // Nothing matched, return as is
  return tree;
}

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const handleInsertNode = (folderId, item, isFolder) => {
    const newTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(newTree);
  };

  return (
    <div>
      <Folder explorerData={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
