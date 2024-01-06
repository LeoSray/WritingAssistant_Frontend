'use client';
import React, { useState, useContext} from 'react';
import { UploadIcon } from './Icons';
import { useRouter } from 'next/navigation';
import '../app/globals.css';

const UploadForm = ({isVisible, toggleVisibility, sessionId, userId }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");

    const router = useRouter();

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Handle the file (upload to server, read contents, etc.)
            setSelectedFile(file);
            console.log('File selected:', file.name);
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            console.log('No file selected');
            return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('session_id', sessionId);
        formData.append('user_id', userId);
        formData.append('title', title);
        try {
            const response = await fetch('http://127.0.0.1:8080/upload_dataset', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('File uploaded successfully', data);
                localStorage.setItem('uploadData', JSON.stringify(data)); // Store the data in localStorage
                toggleVisibility(false);
                router.push('/dashboard');
            } else {
                console.error('Upload failed with status:', response.status);
            }
        } catch (error) {
            console.error('Error making the API call:', error.message);
        }
    };


    return (
        <div id="authentication-modal" aria-hidden="true" className={`${isVisible ? '' : 'hidden'} overflow-y-auto overflow-x-hidden flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="p-4 w-full max-w-md max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Upload Dataset
                    </h3>
                    <button type="button" onClick={() => toggleVisibility(false)}  className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 md:p-5">
                    <form className="space-y-4 " action="#" >
                        <div>
                            <label className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Enter your Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                placeholder="Enter document title" 
                                required
                                onChange={handleTitleChange}
                            />                        
                        </div>
                        <div className="flex flex-col">
                            <label className="text-md font-medium text-gray-900">Upload your dataset:</label>
                            <div className="flex justify-center items-center p-5">
                                {/* <button className="rounded hover:text-gray-500 cursor-pointer">
                                    <UploadIcon/>
                                </button> */}
                                <label className="rounded hover:text-gray-500 cursor-pointer">
                                    <UploadIcon/>
                                    <input 
                                        type="file" 
                                        accept=".csv" 
                                        style={{ display: 'none' }} 
                                        onChange={handleFileUpload} 
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button onClick={handleSubmit}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div> 
    );
};

export default UploadForm;