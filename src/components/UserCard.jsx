'use client';

import React, { useState } from 'react';
import { UploadIcon, ViewIcon } from './Icons';
import UploadForm from './UploadForm';
import '../app/globals.css';

function UserCard({
  title, description, isUploadCard, sessionId, userId,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const toggleUploadForm = () => {
    setIsUpload(!isUpload);
  };

  const handleUserCard = () => {
    console.log(title);
  };

  return (
    <div className="me-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      {isUploadCard ? (
      // Render upload button for the first card
        <div className="p-8 h-[250px] flex flex-col justify-between items-center hover:shadow-xl">
          <div href="#" className="self-start">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          </div>
          <button
            type="button"
            className="flex items-center justify-center flex-grow rounded hover:text-gray-500"
            onClick={toggleUploadForm}
            aria-label="Upload button"
          >
            <UploadIcon />
          </button>
        </div>
      ) : (
        <div
          className="relative p-8 h-[250px] flex flex-col justify-between items-center hover:shadow-xl cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleUserCard}
          onKeyDown={(e) => e.key === 'Enter' && handleUserCard()}
          role="button"
          tabIndex="0"
        >
          <div href="#" className="w-full">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-ellipsis overflow-hidden whitespace-nowrap">
              {title}
            </h5>
          </div>
          <div href="#" className="w-full flex-grow font-normal truncate tracking-tight text-gray-700 dark:text-gray-400 overflow-ellipsis overflow-hidden whitespace-pre-wrap">
            {description}
          </div>
          {isHovered && (
            <div className="absolute inset-0 bg-gray-100 bg-opacity-60 flex justify-center items-center">
              <ViewIcon className="fill-white" />
            </div>
          )}
        </div>
      )}

      {isUpload && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 ">
          <UploadForm
            isVisible={isUpload}
            toggleVisibility={toggleUploadForm}
            sessionId={sessionId}
            userId={userId}
          />
        </div>
      )}
    </div>
  );
}

export default UserCard;
