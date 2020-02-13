import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import { loadCSS } from "fg-loadcss";

import Card from "@material-ui/core/Card";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

//could add deletion of tasks individually or altoghether - *** permanent deletion of a task when inside the Completed Task Folder ***

// Look into limiting the retrieval of tasks into last 20 most recent completely tasks

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

export const CompletedTasks = () => {
  const classes = useStyles();
  const { handleSubmit, register, errors } = useForm();

  const [expanded, setExpanded] = React.useState(false);
  const [taskItems, setTaskItems] = useState([]);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const onSubmit = () => {
    console.log("hi");
  };

  function RetrieveCompletedTasks() {
    useEffect(() => {
      const unsubscribe = db
        .collection("TaskList")
        .where("completed", "==", true)
        .orderBy("timestampinverse")
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
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <ExpansionPanel
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Recently Completed Tasks</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {RetrieveCompletedTasks().map((item, index) => (
              <Card key={item.id} id={item.id}>
                <TextField
                  name="taskItems"
                  type="text"
                  value={item.task}
                  ref={register}
                  onChange={handleChangeInput(index)}
                  color="secondary"
                />
              </Card>
            ))}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </form>
  );
};

// const StyledCard = styled.div`
//   display: flex;
//   justify-content: center;
//   background: lightgray;
//   margin: 10px 10px;
//   padding: 15px;
//   opacity: 1;
//   text-size-adjust:
//   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
//   transition: 0.3s;
//   color: black;
//   width: 100%;

//   :hover {
//     box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.3);
//   }
// `;
