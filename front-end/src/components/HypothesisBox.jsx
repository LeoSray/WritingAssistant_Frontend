'use client'
import React, { useState, useEffect, useContext } from 'react';
import PopupModal from './PopupModal';
import { ChartBarIcon } from '@heroicons/react/24/solid';
import { SelectedColumnContext } from '../context/SelectedColumnContext';
import { HypothesisDataContext } from '../context/HypothesisDataContext';
import { InsightsDataContext } from '../context/InsightsDataContext';
import { Tooltip } from 'react-tooltip';
import { motion } from "framer-motion"
import '../styles/hypothesis.css';

const variants = {
    hidden: { opacity: 0, rotateX: 90 },
    visible: { opacity: 1, rotateX: 0 }
}

// framer motion transitions for buttons
const buttonVariants = {
    hover: { backgroundColor: "#9ca3af" }, // Example hover background color
    clicked: { scale: 0.9, backgroundColor: "#f3f4f6" },  // Example: slightly scale down when clicked
    normal: { scale: 1, backgroundColor: "#FFFFFF"}
};

const HypothesisBox = ({sessionId}) => {
    const {selectedColumn} = useContext(SelectedColumnContext);
    const {updateHypothesisData} = useContext(HypothesisDataContext);
    const {insightsData} = useContext(InsightsDataContext);
    const [hypothesisData, setHypothesisData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const getHypothesisData = async () => {
        if (!selectedColumn) {
            return;
        }

        try {
            console.log("this is the user session in hypothesis: ", sessionId)
            const response = await fetch('http://127.0.0.1:8080/get_hypothesis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'column_name':selectedColumn,
                    'session_id':sessionId
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setHypothesisData(data.data);
                if (data.data.length > 0) {
                    updateHypothesisData(true);
                    setError(false);
                }
                else {
                    updateHypothesisData(false);
                    setError(true);
                }
            } else {
                console.error('Failed to fetch hypothesisData: ', data);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    useEffect(() => {
        if (sessionId) {
            getHypothesisData();
        }
    }, [selectedColumn, refresh, sessionId]);

    const handleRefresh = () => {
        setRefresh(prev => !prev); // Flip the state to trigger re-fetch
    };
    return (
        
        <div className="flex flex-col px-6 w-full">
            <Tooltip id="my-tooltip" content="Open Graph" style={{ zIndex: 1 }}/>
            <div className="flex justify-between items-center bg-neutral-900 border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-[#030712] dark:hover:bg-gray-700">
                <div className="flex flex-col justify-between p-3 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
                        Hypotheses
                    </h5>
                </div>
                <motion.button 
                    onClick={handleRefresh} 
                    type="button" 
                    className="text-black bg-white hover:bg-gray-400 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:text-gray-800 dark:bg-white dark:hover:bg-gray-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="clicked"  // This applies the 'clicked' variant while the button is being tapped/clicked
                    initial="normal"
                    transition={{ duration: 0.2 }}
                >    
                    <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
                    </svg>
                </motion.button>
            </div>
            {error ? (
                <div className="text-center p-4 font-medium">
                    No data available.
                </div>
            ) : selectedColumn === undefined || selectedColumn === null || selectedColumn === ''? (
                <div className="text-center p-4 font-medium">
                    Select a topic to view hypotheses.
                </div>
            ) : hypothesisData.length > 0 ? (
                <div className="hypothesisScroll">
                    <div className="hypothesisContent">
                </div>
                    {hypothesisData.map((header, index) => (
                        // <HypothesisButton key={index} header={header} />
                        <motion.div key={`${header}-${refresh}`} 
                            className="relative px-4 py-1"
                            initial="hidden"
                            animate="visible"
                            variants={variants}
                            transition={{ duration: 0.5 }}>
                            <div className="flex items-center justify-between w-full p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <h5 className="text-lg text-left font-normal tracking-tight text-gray-900 dark:text-white">
                                    {header}
                                </h5>
                                <div className="absolute bottom-0 right-0 p-6">
                                    <ChartBarIcon onClick={openModal} 
                                                className="h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Open modal"
                                                data-tooltip-id="my-tooltip" data-tooltip-content="View Graph" data-tooltip-place="left"
                                    />
                                </div>
                                <PopupModal isModalOpen={isModalOpen} closeModal={closeModal} />
                            </div>
                        </motion.div> 
                    ))}
                </div>   
            ) : (
                <div className="text-center p-4 font-medium">
                    Refresh to generate hypotheses
                </div>
            )}
        </div>
    )
}

export default HypothesisBox
 {/* flex-shrink-0 */}
                {/* <ChartBarIcon onClick={openModal} className="flex-shrink-0 h-6 w-6 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" aria-label="Open modal" /> */}
