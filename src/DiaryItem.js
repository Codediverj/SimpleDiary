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
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)){
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
        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit(); 
        }
    }

    return (
      <div className="DiaryItem">
        <div className="info">
            <span className="author_info">
                author: {author} / emotion : {emotion}
            </span>
            <span className="date">
                {new Date(created_date).toLocaleString()}
            </span>
        </div>
        <div className="content">
            {isEdit ? (
                <>
                    <textarea 
                    ref={localContentInput}
                    value={localContent}
                    onChange={(e)=>setLocalContent(e.target.value)}/>
                </>
            ) : (
                <>{content}</>
            )}
        </div>
        {isEdit ? (
        <>
            <button onClick={handleQuitEdit}>Cancel Edit</button>
            <button onClick={handleEdit}>Save</button>
        </>
        ) : (
        <>
            <button onClick={handleRemove}>Delete</button>
            <button onClick={toggleIsEdit}>Edit</button>
        </>
        )}
      </div>
    );
  };
  export default React.memo(DiaryItem);