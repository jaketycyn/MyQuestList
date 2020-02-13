import React, { useState, useEffect } from 'react';
import { db } from './Firebase';
import FlagIcon from '@material-ui/icons/Flag';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Menu } from 'material-ui';

//consider whether to use timestamp or timestampinvese for future displaying(IE RESEARCH what is common)

//errors.task.message needs something or leave void to prevent blank entry

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const PrioritySelection = item => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [loading, setLoading] = useState(true);
  const [priority, setPriority] = useState([]);

  //componenet scoped variable of individual Item ID

  //TRY TO FIGURE OUT if its doc/collectiont o show priority thing
  const id = item.item.id;
  const test = db
    .collection('TaskList')
    .doc(id)
    .collection('Priority');

  console.log(test);
  function RetrievePriority() {
    useEffect(() => {
      const unsubscribe = db
        .collection('TaskList')
        .doc(id)
        .collection('Priority')
        .onSnapshot(
          doc => {
            setLoading(false);
            setPriority(collection);
          },
          err => {
            setError(err);
          }
        );

      // returning the unsubscribe function will ensure that
      // we unsubscribe from document changes when our id
      // changes to a different value.
      return () => unsubscribe();
    }, [id]);

    return {
      error,
      loading,
      priority
    };
  }

  const onSubmit = (data, e) => {
    console.log('Priority Selected');
    // db.collection('TaskList').update({
    //   task: data.task,
    //   completed: false,
    //   timestamp: new Date(),
    //   timestampinverse: -1 * new Date().getTime()
    // });
    // e.target.reset();
  };
  const handleChange = (e, item) => {
    setPriority(e.target.value);

    db.collection('TaskList')
      .doc(id)
      .update({ priority: e.target.value });
    console.log('Priority be changing');
    console.log(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          item={item}
          value={priority}
          onChange={e => handleChange(e, item)}
          style={{ backgroundColor: 'white' }}
        >
          <MenuItem value={0}>
            <FlagIcon style={{ opacity: 0.0 }} />
          </MenuItem>
          <MenuItem value={5}>
            <FlagIcon style={{ color: 'red' }} />
          </MenuItem>
          <MenuItem value={4}>
            <FlagIcon style={{ color: 'orange' }} />
          </MenuItem>
          <MenuItem value={3}>
            <FlagIcon style={{ color: 'yellow' }} />
          </MenuItem>
          <MenuItem value={2}>
            <FlagIcon style={{ color: 'green' }} />
          </MenuItem>
          <MenuItem value={1}>
            <FlagIcon style={{ color: 'blue' }} />
          </MenuItem>
        </Select>
      </div>
    </form>
  );
};

export default PrioritySelection;
