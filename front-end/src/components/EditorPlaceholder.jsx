'use client';
import '../app/globals.css'

const EditorPlaceholder = () => {
    return (
        <div className="editor-placeholder" style={{ height: '700px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <span className="loader"></span>
            </div>
        </div>
    );
};

export default EditorPlaceholder;
