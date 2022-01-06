import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

type InputProps = {
  ToDo: string;
  Email: string;
  Username: string;
  Password: string;
};

interface IForm {
  ToDo: string;
  Email: string;
  Username: string;
  Password: string;
  Password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError, // Error를 발생시켜줌
    setValue, // value 값 설정 가능
  } = useForm<IForm>({
    defaultValues: {
      Email: '@naver.com',
    },
  });
  const { ToDo, Email, Username, Password } = watch() as InputProps;
  const onValid = (data: IForm) => {
    if (data.Password !== data.Password1) {
      return setError('Password1', { message: 'Password are not same' }, { shouldFocus: true });
    }
    return setError('extraError', { message: 'Server offline' });
  };

  return (
    <Container>
      <MyForm onSubmit={handleSubmit(onValid)}>
        <input autoComplete="off" {...register('ToDo', { required: true, minLength: 10 })} placeholder="Write a to do" />
        <input
          autoComplete="off"
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
          autoComplete="off"
          {...register('Username', {
            validate: {
              Ivan: (value) => !value.includes('ivan') || "you can't use 'ivan'",
              Super: (value) => !value.includes('super') || "you can't use 'super'",
            },
            required: 'please write a username',
            minLength: {
              value: 5,
              message: 'you need to write five words',
            },
          })}
          placeholder="Write a Username"
        />
        <span>{errors?.Username?.message}</span>
        <input
          autoComplete="off"
          {...register('Password', {
            required: 'write here',
            minLength: 5,
          })}
          placeholder="Write a Password"
        />
        <span>{errors?.Password?.message}</span>
        <input
          autoComplete="off"
          {...register('Password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'You password is too short',
            },
          })}
          placeholder="confirm a Password"
        />
        <span>{errors?.Password1?.message}</span>
        <button
          onClick={() => {
            setValue('Username', '', {
              shouldValidate: true,
            });
          }}
        >
          Add
        </button>
        <span>{errors?.extraError?.message}</span>
      </MyForm>
    </Container>
  );
}

export default ToDoList;

const Container = styled.div`
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
`;

const MyForm = styled.form`
  display: flex;
  flex-direction: column;
  input {
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
    border: none;
  }
  button {
    padding: 10px;
    border-radius: 5px;
    font-weight: bold;
    width: 100px;
    margin: 0 auto;
    &:hover {
      background-color: tomato;
    }
  }
`;
