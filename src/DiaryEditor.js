import React, { useEffect, useRef, useState } from "react";  


const DiaryEditor = ({onCreate}) => {

  const authorInput = useRef(); 
  const contentInput = useRef();  
  
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {     
    if(state.author.length < 1) {
      authorInput.current.focus();   
      return;
    }

    if(state.content.length < 5){
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
    alert("Saved successfully!");
  }

  return (
    <div className="DiaryEditor bg-sky-100 p-8 text-center rounded-xl">
      <h2 className="font-bold text-xl mb-4">Today Diary</h2>
      <div>
        <input 
        ref={authorInput}   
        name="author"
        value={state.author} 
        placeholder="Title"
        onChange={handleChangeState}
        className="border border-sky-200 mb-5 p-3 w-full max-w-xl rounded-lg"
        />
      </div>
      <div>
        <textarea 
        ref={contentInput}  
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        placeholder="Content"
        className="border border-sky-200 mb-5 p-3 w-full max-w-xl h-36 rounded-lg"
        />
      </div>
      <div>
        <h3 className="mb-2 text-sky-500">Today was...</h3>
        <select
          name="emotion"
          value={state.emotion} 
          onChange={handleChangeState}
          className="mb-5 p-2 rounded-lg w-full max-w-xl"
        >
          <option value={1}>So happy</option>
          <option value={2}>Happy</option>
          <option value={3}>So So</option>
          <option value={4}>Bad</option>
          <option value={5}>So Bad</option>
        </select>
      </div>
      <div>
        <button 
          onClick={handleSubmit}
          className="bg-sky-500 w-20 p-2 cursor-pointer rounded-full text-white font-bold"
          >Save</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);