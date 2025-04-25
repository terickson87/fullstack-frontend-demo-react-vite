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
    <Dialog open={showCreateModal} onClose={() => handleCloseModal()}>
      <DialogContent>
        <DialogContentText sx={{mb: 1}}>
          Input note body and create note.
        </DialogContentText>
        <TextareaAutosize
          placeholder="Input Body"
          id="note-input-body"
          style={{width: '100%'}}
          value={noteBodyInputValue}
          onChange={(event) => setNoteBodyInputValue(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseModal()}>Cancel</Button>
        <Button onClick={() => handleClickCreateNote()}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}