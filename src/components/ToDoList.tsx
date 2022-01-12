import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Categories, categorySelector, categoryState, toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const [toDos, doing, done] = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const selectedArray = useRecoilValue(categorySelector);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as Categories);
  };
  const onClickSave = () => {
    value.forEach((item, index) => {
      const localSaveArray = {
        text: item.text,
        id: item.id,
        category: item.category,
      };
      localStorage.setItem(item.id + '', JSON.stringify(localSaveArray));
    });
  };
  return (
    <>
      <Container>
        <Header>
          <h1 style={{ fontSize: '50px' }}> To Dos </h1>
          <button onClick={onClickSave}>Save</button>
        </Header>
        <Select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </Select>
        <CreateToDo />
        <ul>
          {selectedArray.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </ul>
      </Container>
    </>
  );
}

export default ToDoList;

const Header = styled.div`
  text-align: center;
  button {
    height: 35px;
    width: 70px;
    font-size: 20px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: rgba(231, 76, 60, 1);
    color: white;
    cursor: pointer;
    &:active {
      box-shadow: 0px 0px 5px 0px rgba(231, 76, 60, 1);
    }
    &:hover {
      background-color: rgba(255, 255, 255, 1);
      color: tomato;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 780px;
  margin: 50px auto;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 50px;
`;

const Select = styled.select`
  width: 100px;
  margin: 10px 0;
  padding: 5px 30px 5px 10px;
  border-radius: 5px;
  border: 1px solid white;
`;
