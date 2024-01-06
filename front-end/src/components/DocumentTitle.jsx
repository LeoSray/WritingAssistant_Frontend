'use client';
import React, { useState } from 'react';
import '../app/globals.css';

const DocumentTitle = () => {
    const [title, setTitle] = useState('');

    return (
        <div className="documentTitle hidden md:flex md:pl-4 lg:pl-4 xl:pl-24">
            <button>
                <input type="text"
                    data-name="header-title-input"
                    aria-label="Give your document a name."
                    suppressContentEditableWarning={true}
                    placeholder="Untitled Document"
                >
                </input>
            </button>
        </div>
    );
};

export default DocumentTitle;