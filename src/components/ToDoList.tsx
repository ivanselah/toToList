import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { categorySelector, categoryState, IToDo, toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const selectedArray = useRecoilValue(categorySelector);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value);
  };
  console.log(selectedArray);
  return (
    <div style={{ padding: '50px' }}>
      <h1>To Dos</h1>
      <hr />
      <Select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </Select>
      <CreateToDo />
      <ul>
        {selectedArray.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;

const Select = styled.select`
  width: 70px;
  margin: 10px 0;
`;
