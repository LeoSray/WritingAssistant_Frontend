'use client';

import React, { useState, useContext } from 'react';
import { EditorDataContext } from '../context/EditorDataContext';
import { InsightsDataContext } from '../context/InsightsDataContext';
import { HypothesisDataContext } from '../context/HypothesisDataContext';

function SaveButton() {
  const { editorText } = useContext(EditorDataContext);
  const { insightsData } = useContext(InsightsDataContext);
  const { hypothesisData } = useContext(HypothesisDataContext);

  const handleSave = () => {
    console.log('saving the following data: ');
    console.log(editorText);
    console.log(insightsData);
    console.log(hypothesisData);
  };
  return (
    <button type="button" className="text-black font-bold" onClick={handleSave}>
      Save
    </button>
  );
}

export default SaveButton;
