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
  const { register, watch } = useForm();
  const { ToDo, Email, Username, Password } = watch() as InputProps;
  console.log(ToDo, Email, Username, Password);
  return (
    <div>
      <form>
        <input {...register('ToDo')} placeholder="Write a to do" />
        <input {...register('Email')} placeholder="Write a Email" />
        <input {...register('Username')} placeholder="Write a Username" />
        <input {...register('Password')} placeholder="Write a Password" />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
