import { useForm } from 'react-hook-form';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

interface IToDo {
  text: string;
  id: number;
  category: 'DONE' | 'DOING' | 'TO_DO';
}

const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

interface IForm {
  toDo: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>();
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ text: toDo, id: Date.now(), category: 'TO_DO' }, ...oldTodos]);
    setValue('toDo', '');
    console.log(toDos);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('toDo', {
            required: 'please a write',
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => (
          <li key={toDo.id}>{toDo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
