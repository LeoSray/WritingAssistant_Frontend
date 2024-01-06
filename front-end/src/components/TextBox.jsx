'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
// import dynamic from 'next/dynamic';
import { Bold, Italic, UnderlineIcon, Strike } from './Icons';
import { Tooltip } from 'react-tooltip'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import '../app/globals.css'

const TextBox = () => {
  // Configure the Placeholder extension separately
  const placeholderExtension = Placeholder.configure({
    placeholder: 'Start typing your text here.',
    emptyEditorClass: 'is-editor-empty',
    emptyNodeClass: 'is-empty'
  });
  const editor = useEditor({
    autoFocus: true,
    extensions: [
      StarterKit,
      placeholderExtension, // Add the configured placeholder extension
      Underline,
    ],
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (editor) {
      console.log("Editor loaded");
      editor.commands.focus('start');
    }
  }, [editor]); // Dependency array ensures this effect runs only when the editor is initialized

  // Debounce function
  const debounce = (func, delay) => {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to extract the last two sentences
  const extractData = () => {
    if (editor) {
      const text = editor.getHTML();
      const plainText = text.replace(/<[^>]*>?/gm, '');
      const sentences = plainText.split('.').map(s => s.trim()).filter(s => s.length > 0);
      const lastTwoSentences = sentences.slice(-2).join('. ') + '.';
      console.log("Last two sentences:", lastTwoSentences);
    }
  };

  // only call the debounce function if the user stops typing for 2 seconds.
  const debouncedExtraction = useCallback(debounce(extractData, 2000), [editor]);

  // keeps track of the updates to the editor content
  useEffect(() => {
    if (editor) {
      // Subscribe to the update event
      const handleUpdate = () => {
        debouncedExtraction();
      };
      editor.on('update', handleUpdate);
  
      // Return a cleanup function
      return () => {
        // Unsubscribe from the update event
        editor.off('update', handleUpdate);
      };
    }
  }, [editor, debouncedExtraction]);

  return (
    <div className="editor-container border border-gray-700 flex flex-col flex-grow mx-6 rounded-xl mb-10 overflow-hidden">
      <Tooltip id="my-tooltip" />

      {/* Editor content */}
      <EditorContent editor={editor} className="flex-grow overflow-auto"/>

      {/* Toolbar */}
      <div className="toolbar flex relative justify-center mb-3 space-x-8">
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Bold" data-tooltip-place="top" onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold/>
        </button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Italic" data-tooltip-place="top" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic/>
        </button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Underline" data-tooltip-place="top" onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <UnderlineIcon/>
        </button>
        <button data-tooltip-id="my-tooltip" data-tooltip-content="Strike" data-tooltip-place="top" onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strike/>
        </button>
      </div>
    </div>  
  )
}

export default TextBox;
