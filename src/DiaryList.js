import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ onEdit, onDelete, diaryList }) => {
  return (
    <div ClassName="DiaryList">
      <h2>List</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {diaryList.map((it) => (
          <div key={it.id}>
            <DiaryItem key={it.id} {...it} onEdit={onEdit} onDelete={onDelete}/>
          </div>
        ))}
      </div>
    </div>
  );
};

DiaryList.defaultProps={
  diaryList: [],
}

export default DiaryList;