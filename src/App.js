import React, { useCallback, useEffect, useRef, useReducer, useMemo } from "react";
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch(action.type){
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it)=>it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it)=>it.id === action.targetId ? 
      {...it, content:action.newContent} : it);
    }
    default: 
    return state;
  }
};

export const DiaryStateContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);
  const getData = async()=> {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    
    const initData = res.slice(0,20).map((it)=>{
      return{
        author : it.email,
        content : it.body,
        emotion : Math.floor(Math.random()*5)+1, 
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    });
    dispatch({type:"INIT", data:initData})
  };

  useEffect(()=>{
    getData();
  },[]);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({type: "CREATE", data:{author, content, emotion, id : dataId.current}})
    dataId.current += 1;
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({type: "REMOVE", targetId})
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type: "EDIT", targetId, newContent})
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it)=>it.emotion >= 3 ).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio};
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}/>
      <div>Total : {data.length}</div>
      <div>Good Mood day : {goodCount}</div>
      <div>Bad Mood day : {badCount}</div>
      <div>Good day (%) : {goodRatio}%</div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;