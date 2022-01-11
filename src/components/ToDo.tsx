import { IToDo, toDoState } from '../atoms';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

type Category = 'DOING' | 'TO_DO' | 'DONE'; // <= 이렇게 써도 되지만
// newCategory: Category, 반복하는 것보단 IToDo['category'] ⭐️

function ToDo({ text, category, id }: IToDo) {
  // <button onClick={()=>onClick('DOING')}>Doing</button>
  // const onClick = (newCategory: IToDo['category']) => {
  //   console.log(newCategory);
  // };
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as IToDo['category'] };
      const newArray = [...oldToDos]; // react로 저장한 state들은 직접적으로 수정할 수 없으므로 복제해서 사용
      newArray.splice(targetIndex, 1, newToDo);
      return newArray;
    });
  };

  return (
    <li>
      <Container>
        <Text>{text}</Text>
        {category !== 'DOING' && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== 'TO_DO' && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== 'DONE' && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </Container>
    </li>
  );
}

export default ToDo;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 0;
  button {
    height: 30px;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:active {
      box-shadow: 0px 0px 5px 0px rgba(231, 76, 60, 1);
    }
    &:hover {
      background-color: rgba(231, 76, 60, 1);
      color: white;
    }
  }
`;

const Text = styled.div`
  display: flex;
  height: 30px;
  padding: 2px;
  font-size: 30px;
  font-weight: bold;
  color: rgba(231, 76, 60, 1);
  margin-right: 5px;
`;
