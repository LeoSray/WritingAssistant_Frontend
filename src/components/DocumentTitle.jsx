'use client';

import React from 'react';
import '../app/globals.css';

function DocumentTitle() {
//   const [title, setTitle] = useState('');
// Hello
  return (
    <div className="documentTitle hidden md:flex md:pl-4 lg:pl-4 xl:pl-24 text-white">
      <button type="button">
        <input
          type="text"
          data-name="header-title-input"
          aria-label="Give your document a name."
          suppressContentEditableWarning
          placeholder="Untitled Document"
        />
      </button>
    </div>
  );
}

export default DocumentTitle;
