import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { CreateNoteDialog } from './CreateNoteDialog';
import { DeleteNoteDialog } from './DeleteNoteDialog';
import { Note } from './types';
import { NoteCard } from './NoteCard';
import { fetchAllNotes, createNote, deleteNote, updateNote } from './apiCalls';
import { UpdateNoteDialog } from './UpdateNoteDialog';

const hardCodedNotes: Note[] = [
  {
    "id": -1,
    "createdAt": new Date("2025-04-17T22:27:01.757638Z"),
    "modifiedAt": new Date("2025-04-17T22:27:01.757638Z"),
    "body": "Note 1 body"
  },
  {
    "id": -2,
    "createdAt": new Date("2025-04-17T23:27:01.757638Z"),
    "modifiedAt": new Date("2025-04-17T23:27:01.757638Z"),
    "body": "Note 2 body"
  }
]

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App(): React.JSX.Element {
  const [notes, setNotes] = useState<Note[]>(hardCodedNotes);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [noteBodyInputValue, setNoteBodyInputValue] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [noteDeleteId, setNoteDeleteId] = useState<number | undefined>(undefined);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [noteUpdateId, setNoteUpdateId] = useState<number | undefined>(undefined);

  async function handleFetchAllNotes(): Promise<void> {
    const notes = await fetchAllNotes();
    setNotes([...hardCodedNotes, ...notes]);
  }

  async function handleClickCreateNote(): Promise<void> {
    const response = await createNote(noteBodyInputValue);
    if (response.status === 200) {
      await handleFetchAllNotes();
    }
    setNoteBodyInputValue('');
    setShowCreateModal(false);
  }

  async function handleClickDeleteNote(): Promise<void> {
    const response = await deleteNote(noteDeleteId);
    if (response.status === 200) {
      await handleFetchAllNotes();
    }
    setNoteDeleteId(undefined);
    setShowDeleteModal(false);
  }

  async function handleClickUpdateNote(): Promise<void>  {
    const response = await updateNote(noteUpdateId, noteBodyInputValue);
    if (response.status === 200) {
      await handleFetchAllNotes();
    }
    setNoteBodyInputValue('');
    setNoteUpdateId(undefined);
    setShowUpdateModal(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{alignItems: "center"}}>
        <Stack sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography align='center' variant='h3' color='textPrimary' sx={{mb:1}}>
            Note App Test Front-End
          </Typography>
          {notes.map(it => <NoteCard note={it}/>)}
          <Button variant="outlined" sx={{mb:1}} onClick={() => handleFetchAllNotes()}>Fetch All Notes</Button>
          <Button variant="outlined" sx={{mb:1}} onClick={() => setShowCreateModal(true)}>Create Note</Button>
          <Button variant="outlined" sx={{mb:1}} onClick={() => setShowDeleteModal(true)}>Delete Note</Button>
          <Button variant="outlined" onClick={() => setShowUpdateModal(true)}>Update Note</Button>
          <CreateNoteDialog
            showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal}
            noteBodyInputValue={noteBodyInputValue} setNoteBodyInputValue={setNoteBodyInputValue}
            handleClickCreateNote={handleClickCreateNote} />
          <DeleteNoteDialog
            showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
            noteDeleteId={noteDeleteId} setNoteDeleteId={setNoteDeleteId}
            handleClickDeleteNote={handleClickDeleteNote} />
          <UpdateNoteDialog
            showUpdateModal={showUpdateModal} setShowUpdateModal={setShowUpdateModal}
            noteUpdateId={noteUpdateId} setNoteUpdateId={setNoteUpdateId}
            noteBodyInputValue={noteBodyInputValue} setNoteBodyInputValue={setNoteBodyInputValue}
            notes={notes}
            handleClickUpdateNote={handleClickUpdateNote} />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
