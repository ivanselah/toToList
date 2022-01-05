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

function ToDoList() {
  const { register, watch, handleSubmit, formState } = useForm();
  const { ToDo, Email, Username, Password } = watch() as InputProps;
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onValid)}>
        <input {...register('ToDo', { required: true, minLength: 10 })} placeholder="Write a to do" />
        <input {...register('Email', { required: 'you need email' })} placeholder="Write a Email" />
        <input {...register('Username')} placeholder="Write a Username" />
        <input
          {...register('Password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'You password is too short',
            },
          })}
          placeholder="Write a Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
