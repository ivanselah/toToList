import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { toDoSelector, toDoState } from '../atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function ToDoList() {
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const [toDos, doing, done] = useRecoilValue(toDoSelector);

  return (
    <div style={{ padding: '50px' }}>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <Title>💡To Do</Title>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <Title>Doing</Title>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <Title>Done</Title>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;

const Title = styled.h2`
  margin-top: 10px;
`;
