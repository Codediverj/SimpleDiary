import React, {useRef, useState} from "react";

const DiaryItem = ({
    onEdit,
    onDelete,
    id,
    author, 
    content, 
    emotion, 
    created_date, 
}) => {

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const handleRemove = () => {
        if(window.confirm(`Do you really want to delete diary ${id}?`)){
            onDelete(id);
        }
    };

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = () => {
        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }
        if(window.confirm(`Do you want to edit diary ${id}?`)){
            onEdit(id, localContent);
            toggleIsEdit(); 
        }
    }

    return (
      <div className="DiaryItem border border-sky-200 rounded-lg">
        <div className="info">
            <span className="author_info">
                Author: {author} / Emotion : {emotion}
            </span>
            <span className="date block">
                {new Date(created_date).toLocaleString()}
            </span>
        </div>
        <div className="content pt-4 pb-8">
            {isEdit ? (
                <>
                    <textarea 
                    ref={localContentInput}
                    value={localContent}
                    onChange={(e)=>setLocalContent(e.target.value)}
                    className="w-full h-30"
                    />
                </>
            ) : (
                <>{content}</>
            )}
        </div>
        {isEdit ? (
        <>
            <button onClick={handleQuitEdit} className="bg-gray-400 py-1 px-4 rounded text-white mr-2">Cancel</button>
            <button onClick={handleEdit} className="bg-sky-400 py-1 px-4 rounded text-white">Save</button>
        </>
        ) : (
        <>
            <button onClick={handleRemove} className="bg-red-400 py-1 px-4 rounded text-white mr-2">Delete</button>
            <button onClick={toggleIsEdit} className="bg-sky-400 py-1 px-4 rounded text-white">Edit</button>
        </>
        )}
      </div>
    );
  };
  export default React.memo(DiaryItem);