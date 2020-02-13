import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import { loadCSS } from 'fg-loadcss';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import CompleteItemDialogue from './CompleteItemDialogue';
import DeleteItemDialogue from './DeleteItemDialogue';
import PrioritySelection from './PrioritySelection';
import { List, arrayMove } from 'react-movable';

//Task List

// accessing firebase list items
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    margin: theme.spacing(1),
    maxWidth: '95%',
    backgroundColor: theme.palette.background.paper
  }
}));
// Rendering Items retrieved from Firebase
const TaskList = () => {
  const { handleSubmit, register, errors } = useForm();
  const [taskItems, setTaskItems] = useState([]);

  const onSubmit = () => {
    console.log('hi');
  };

  function RetrieveTaskList() {
    useEffect(() => {
      const unsubscribe = db
        .collection('TaskList')
        .where('completed', '==', false)
        .orderBy('timestampinverse')
        .onSnapshot(snapshot => {
          const newTaskItems = snapshot.docs.map(childNodes => ({
            id: childNodes.id,
            ...childNodes.data()
          }));
          setTaskItems(newTaskItems);
        });
      return () => unsubscribe();
    }, []);
    return taskItems;
  }

  const handleChangeInput = index => e => {
    let newArr = [...taskItems];
    newArr[index].task = e.target.value;
    setTaskItems(newArr);

    let itemId = taskItems[index].id;
    // if (db.collection("TaskList").doc(id) !== null) {
    //   db.collection("TaskList")
    //     .doc(id)
    //     .update({
    //       task: value
    //     });
    // }
    console.log(taskItems[index].id);
  };

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css')
    );
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {RetrieveTaskList().map((item, index) => (
          <StyledCard key={item.id} id={item.id}>
            <CompleteItemDialogue item={item} />
            <PrioritySelection item={item} />
            <TextField
              name="taskItems"
              type="text"
              value={item.task}
              ref={register}
              onChange={handleChangeInput(index)}
              color="secondary"
            />
            <DeleteItemDialogue item={item} />
          </StyledCard>
        ))}
      </div>
    </form>
  );
};

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  background: white;
  margin: 10px 10px;
  padding: 15px;
  opacity: 1;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
  transition: 0.3s;

  :hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
  }
`;
// Old styled component test button
// const StyledButton = styled.button`
//   border-radius: 5px;
//   background-color: ${props => (props.secondary ? "green" : "orange")};
//   color: #fff;
//   padding: 5px 7.5px;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   margin: 15px;
// `;

export default TaskList;
