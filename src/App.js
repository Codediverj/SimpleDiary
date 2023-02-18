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
    
    const initData = res.slice(0,5).map((it)=>{
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
      <h2 className="font-bold text-xl mt-12 mb-4">Diary List</h2>
      <div className="bg-sky-100 mt-4 mb-6 p-6 text-center text-black/80">
        <div>Total <div className="inline text-sky-500 font-bold">{data.length} days</div> diary</div>
        <div>Good Mood day : <div className="inline text-sky-500 font-bold">{goodCount} days</div></div>
        <div>Bad Mood day : <div className="inline text-sky-500 font-bold">{badCount} days</div></div>
        <div>Good day (%) : <div className="inline text-sky-500 font-bold">{goodRatio}%</div></div>
      </div>
      <DiaryList onEdit={onEdit} onDelete={onDelete} diaryList={data}/>
    </div>
  );
}

export default App;