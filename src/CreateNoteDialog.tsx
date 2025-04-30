import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextareaAutosize from '@mui/material/TextareaAutosize';

type CreateNoteDialogProps = {
  showCreateModal: boolean;
  setShowCreateModal: (x: boolean) => void;
  noteBodyInputValue: string;
  setNoteBodyInputValue: (x: string) => void;
  handleClickCreateNote: () => void;
}

export function CreateNoteDialog({
  showCreateModal, setShowCreateModal,
  noteBodyInputValue, setNoteBodyInputValue,
  handleClickCreateNote
}: CreateNoteDialogProps): React.JSX.Element {
  const handleCloseModal = useCallback(() => {
    setNoteBodyInputValue('');
    setShowCreateModal(false);
    }, [setNoteBodyInputValue, setShowCreateModal])

  return (
    <Dialog data-testid="create-note-dialog" open={showCreateModal} onClose={() => handleCloseModal()}>
      <DialogContent>
        <DialogContentText sx={{mb: 1}}>
          Input note body and create note.
        </DialogContentText>
        <TextareaAutosize
          placeholder="Input Body"
          id="create-note-input-body"
          data-testid="create-note-input-body"
          style={{width: '100%'}}
          value={noteBodyInputValue}
          onChange={(event) => setNoteBodyInputValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          id="create-note-cancel-button"
          data-testid="create-note-cancel-button"
          onClick={() => handleCloseModal()}>Cancel</Button>
          <Button
            id="create-note-create-button"
            data-testid="create-note-create-button"
            onClick={() => handleClickCreateNote()}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}