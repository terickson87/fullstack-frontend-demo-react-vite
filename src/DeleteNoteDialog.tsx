import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

type CreateNoteDialogProps = {
  showDeleteModal: boolean;
  setShowDeleteModal: (x: boolean) => void;
  noteDeleteId: number | undefined;
  setNoteDeleteId: (x: number | undefined) => void;
  handleClickDeleteNote: () => void;
}

export function DeleteNoteDialog({
  showDeleteModal, setShowDeleteModal,
  noteDeleteId, setNoteDeleteId,
  handleClickDeleteNote
}: CreateNoteDialogProps): React.JSX.Element {
  const handleCloseModal = useCallback(() => {
    setNoteDeleteId(undefined);
    setShowDeleteModal(false);
  }, [setNoteDeleteId, setShowDeleteModal])

  return(
    <Dialog open={showDeleteModal} onClose={() => handleCloseModal()}>
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
          <Button onClick={() => handleCloseModal()}>Cancel</Button>
          <Button onClick={() => handleClickDeleteNote()}>Delete</Button>
        </DialogActions>
      </Dialog>
  )
}