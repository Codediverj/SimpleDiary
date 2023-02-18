import DiaryItem from "./DiaryItem.js";

const DiaryList = ({ onEdit, onDelete, diaryList }) => {
  return (
    <div ClassName="DiaryList">
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