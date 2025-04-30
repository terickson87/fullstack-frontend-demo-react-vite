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
  // const handleIdChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const newId = parseInt(event.target.value);
  //   setNoteDeleteId(newId);
  // }, [setNoteDeleteId]);

  return(
    <Dialog data-testid="delete-note-dialog" open={showDeleteModal} onClose={() => handleCloseModal()}>
        <DialogContent>
          <DialogContentText sx={{mb: 1}}>
            Enter the ID of the note to delete.
          </DialogContentText>
          <TextField
            id="delete-note-id-field"
            data-testid="delete-note-id-field"
            label="ID"
            variant="outlined"
            value={noteDeleteId}
            onChange={(event) => setNoteDeleteId(parseInt(event.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button
            id="delete-note-cancel-button"
            data-testid="create-note-cancel-button"
            onClick={() => handleCloseModal()}>Cancel</Button>
          <Button
            id="delete-note-delete-button"
            data-testid="delete-note-delete-button"
            onClick={() => handleClickDeleteNote()}>Delete</Button>
        </DialogActions>
      </Dialog>
  )
}