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
    alert("저장성공");
  }

  return (
    <div className="DiaryEditor">
      <h2>Today</h2>
      <div>
        <input 
        ref={authorInput}   
        name="author"
        value={state.author} 
        onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea 
        ref={contentInput}  
        name="content"
        value={state.content} 
        onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion} 
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);