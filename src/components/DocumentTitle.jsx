'use client';

import React, { useEffect, useState } from 'react';
import '../app/globals.css';

function DocumentTitle({ title }) {
  const [inputTitle, setInputTitle] = useState(title);

  useEffect(() => {
    // Retrieve the title from 'dataSetInfo' in localStorage
    const storedDataString = localStorage.getItem('dataSetInfo');
    if (storedDataString) {
      const storedData = JSON.parse(storedDataString);
      setInputTitle(storedData.title || title);
    }
  }, [title]);

  const handleChange = (e) => {
    const newTitle = e.target.value;
    setInputTitle(newTitle); // Update local state on input change

    // Update the 'dataSetInfo' in localStorage with the new title
    const storedDataString = localStorage.getItem('dataSetInfo');
    const storedData = storedDataString ? JSON.parse(storedDataString) : {};
    storedData.title = newTitle;
    localStorage.setItem('dataSetInfo', JSON.stringify(storedData));
  };

  return (
    <div className="documentTitle hidden md:flex md:pl-4 lg:pl-4 xl:pl-24 text-white">
      <button type="button">
        <input
          type="text"
          data-name="header-title-input"
          aria-label="Give your document a name."
          suppressContentEditableWarning
          placeholder="Untitled Document"
          value={inputTitle} // Set value to inputTitle or default
          onChange={handleChange} // Handle changes to the input
        />
      </button>
    </div>
  );
}

export default DocumentTitle;
