import { Fragment, useState, FC, useContext, useCallback } from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { INote, NotesContext } from '../../App';

export const Modal = () => {
  const context = useContext(NotesContext);
  const { handleRemoveNote, openModal, setOpenModal, isActiveNote } = context;
  const handleOpen = () => setOpenModal(!openModal);

  const onDeleteNote = useCallback(() => {
    if (isActiveNote) {
      handleRemoveNote(isActiveNote.id);
    }
  }, [handleRemoveNote, isActiveNote]);

  return (
    <Fragment>
      <Dialog open={openModal} handler={handleOpen}>
        <DialogHeader className="text-center">Are you sure you want to delete?</DialogHeader>
        <DialogBody divider>This will permanently delete the note from your device</DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              onDeleteNote();
              handleOpen();
            }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
};
