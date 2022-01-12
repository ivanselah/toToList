import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categoryState, toDoState } from '../atoms';

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldTodos) => [{ text: toDo, id: Date.now(), category }, ...oldTodos]);
    setValue('toDo', '');
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        autoComplete="off"
        {...register('toDo', {
          required: 'please a write',
        })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </Form>
  );
}

export default CreateToDo;

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const Input = styled.input`
  height: 30px;
  width: 250px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: center;
    font-size: 17px;
  }
`;

const Button = styled.button`
  height: 30px;
  width: 50px;
  border: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  &:active {
    box-shadow: 0px 0px 5px 0px rgba(231, 76, 60, 1);
  }
  &:hover {
    background-color: rgba(231, 76, 60, 1);
    color: white;
  }
`;
