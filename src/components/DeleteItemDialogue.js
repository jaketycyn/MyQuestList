import React from "react";
import Button from "@material-ui/core/Button";
import { db } from "./Firebase";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function DeleteItemDialogue(item) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DeleteItem = item => {
    //using passed down prop to access ID on Firebase DB
    let itemId = item.item.id;
    db.collection("TaskList")
      .doc(itemId)
      .delete();
    handleClose();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <DeleteIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Task?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once deleted you will not be able to retrieve.
          </DialogContentText>
        </DialogContent>
        <DialogActions item={item}>
          <Button
            onClick={() => DeleteItem(item)}
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
