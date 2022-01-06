import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [todo, setTodo] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

type InputProps = {
  ToDo: string;
  Email: string;
  Username: string;
  Password: string;
};

type IForm = {
  ToDo: string;
  Email: string;
  Username: string;
  Password: string;
  Password1: string;
};

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      Email: '@naver.com',
    },
  });
  const { ToDo, Email, Username, Password } = watch() as InputProps;
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        <input {...register('ToDo', { required: true, minLength: 10 })} placeholder="Write a to do" />
        <input
          {...register('Email', {
            required: 'you need email',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: 'wrong email',
            },
          })}
          placeholder="Write a Email"
        />
        <span>{errors?.Email?.message}</span>
        <input
          {...register('Username', {
            required: true,
            minLength: {
              value: 5,
              message: 'you need to write five words',
            },
          })}
          placeholder="Write a Username"
        />
        <span>{errors?.Username?.message}</span>
        <input
          {...register('Password', {
            required: 'write here',
            minLength: {
              value: 5,
              message: 'You password is too short',
            },
          })}
          placeholder="Write a Password"
        />
        <span>{errors?.Password?.message}</span>
        <input
          {...register('Password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'You password is too short',
            },
          })}
          placeholder="confirm a Password"
        />
        <span>{errors?.Password?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
