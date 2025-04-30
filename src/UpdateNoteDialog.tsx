import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import React, { useCallback } from 'react';
import { Note } from './types';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Typography from '@mui/material/Typography';

type UpdateNoteDialogProps = {
  showUpdateModal: boolean;
  setShowUpdateModal: (x: boolean) => void;
  noteUpdateId: number | undefined;
  setNoteUpdateId: (x: number | undefined) => void;
  noteBodyInputValue: string;
  setNoteBodyInputValue: (x: string) => void;
  notes: Note[];
  handleClickUpdateNote: () => void;
}

export function UpdateNoteDialog({
  showUpdateModal, setShowUpdateModal,
  noteUpdateId, setNoteUpdateId,
  noteBodyInputValue, setNoteBodyInputValue,
  notes,
  handleClickUpdateNote
}: UpdateNoteDialogProps): React.JSX.Element {
  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const parsedId = parseInt(event.target.value);
    const noteId = !isNaN(parsedId) ? parsedId : undefined;
    setNoteUpdateId(noteId);

    if (noteId === undefined) {
      setNoteBodyInputValue('');
      return;
    }

    const thisNote: Note[] = notes.filter((it) => it.id === noteId);
    if (thisNote.length === 1) {
      setNoteBodyInputValue(thisNote[0].body);
    }
  }
  
  const handleCloseModal = useCallback(() => {
      setNoteUpdateId(undefined);
      setNoteBodyInputValue('');
      setShowUpdateModal(false);
    }, [setNoteBodyInputValue, setNoteUpdateId, setShowUpdateModal])

  return (
    <Dialog data-testid="update-note-dialog" open={showUpdateModal} onClose={() => handleCloseModal()}>
      <DialogContent>
        <DialogContentText sx={{mb: 1}}>
          Enter the ID of the note to update.
        </DialogContentText>
        <TextField
          id="update-note-id-field"
          label="ID"
          variant="outlined"
          value={noteUpdateId}
          onChange={(event) => handleIdChange(event)}
          sx={{mb: 1}}
        />
        {noteUpdateId !== undefined && (noteBodyInputValue.length > 0 ?
          <TextareaAutosize
          placeholder="Input Body"
          id="note-input-body"
          style={{width: '100%'}}
          value={noteBodyInputValue}
          onChange={(event) => setNoteBodyInputValue(event.target.value)}
            />
          :
          <Typography variant='body1' color='textSecondary'>Note with ID: {noteUpdateId} note found.</Typography>)
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleCloseModal()}>Cancel</Button>
        <Button onClick={() => handleClickUpdateNote()}>Update</Button>
      </DialogActions>
    </Dialog>
  )
}