import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

type CreateNoteDialogProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: (x: boolean) => void;
  noteDeleteId: number| undefined;
  setNoteDeleteId: (x: number) => void;
  handleClickDeleteNote: () => void;
}

export function DeleteNoteDialog({
  showDeleteModal, setShowDeleteModal,
  noteDeleteId, setNoteDeleteId,
  handleClickDeleteNote
}: CreateNoteDialogProps): React.JSX.Element {

  return(
    <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogContent>
          <DialogContentText sx={{pb: 1}}>
            Enter the ID of the note to delete.
          </DialogContentText>
          <TextField
            id="delete-note-id-field"
            label="ID"
            variant="outlined"
            value={noteDeleteId}
            onChange={(event) => setNoteDeleteId(parseInt(event.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button onClick={() => handleClickDeleteNote()}>Delete</Button>
        </DialogActions>
      </Dialog>
  )
}