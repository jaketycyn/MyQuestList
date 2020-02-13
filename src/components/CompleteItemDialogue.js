import React from "react";
import Button from "@material-ui/core/Button";
import { db } from "./Firebase";
import Icon from "@material-ui/core/Icon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import styled from "styled-components";

export default function DeleteItemDialogue(item) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CompleteItem = item => {
    //using passed down prop to access ID on Firebase DB
    let itemId = item.item.id;
    db.collection("TaskList")
      .doc(itemId)
      .update({ completed: true });
    console.log("hi");
    handleClose();
  };

  return (
    <div>
      <StyledIcon
        className="fa fa-check-circle"
        variant="outlined"
        onClick={handleClickOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Task Completed?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" />
        </DialogContent>
        <DialogActions item={item}>
          <Button
            onClick={() => CompleteItem(item)}
            color="primary"
            autoFocus
            id={item.id}
          >
            Yes
          </Button>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const StyledIcon = styled(Icon)`
  color: blacks;
  align-content: center;
  padding: 7px 14px;
  &:hover {
    color: green;
  }
`;
