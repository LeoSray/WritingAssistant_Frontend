'use client';

import React from 'react';
import '../app/globals.css';

function EditorPlaceholder() {
  return (
    <div className="editor-placeholder" style={{ height: '700px', position: 'relative' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      }}
      >
        <span className="loader" />
      </div>
    </div>
  );
}

export default EditorPlaceholder;
