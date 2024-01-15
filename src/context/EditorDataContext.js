'use client';

import React, { useState } from 'react';

export const EditorDataContext = React.createContext({
  editorText: '',
  setEditorData: () => {},
});

export function EditorDataProvider({ children }) {
  const [editorText, setEditorText] = useState('');
  return (
    <EditorDataContext.Provider value={{ editorText, setEditorText }}>
      {children}
    </EditorDataContext.Provider>
  );
}
