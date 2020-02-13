import React from 'react';
import { useForm } from 'react-hook-form';
import { db } from './Firebase';
import styled from 'styled-components';

//consider whether to use timestamp or timestampinvese for future displaying(IE RESEARCH what is common)

//errors.task.message needs something or leave void to prevent blank entry
const CreateTasks = () => {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (data, e) => {
    console.log('Task Created');
    db.collection('TaskList').add({
      task: data.task,
      priority: 1,
      completed: false,
      timestamp: new Date(),
      timestampinverse: -1 * new Date().getTime()
    });
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="task"
        placeholder="Create a Task..."
        ref={register({ required: true })}
      />
      {errors.task && errors.task.message}

      <button type="submit">+</button>
    </form>
  );
};

export default CreateTasks;
