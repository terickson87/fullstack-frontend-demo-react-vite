import React, { useState } from 'react'
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import { CreateNoteDialog } from './CreateNoteDialog';
import { DeleteNoteDialog } from './DeleteNoteDialog';
import { Note, NotesResponse, notesResponseSchema } from './types';
import { NoteCard } from './NoteCard';

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

function App() {
  const [notes, setNotes] = useState<Note[]>(hardCodedNotes);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [noteBodyInputValue, setNoteBodyInputValue] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [noteDeleteId, setNoteDeleteId] = useState<number | undefined>(undefined);

  async function fetchNotes(): Promise<void> {
    const response = await fetch('http://localhost:8080/notes/all');
    const json = await response.json();
    const validated: NotesResponse = notesResponseSchema.parse(json);
    const notes: Note[] = validated.notes;
    setNotes([...hardCodedNotes, ...notes])
  }

  async function createNote(): Promise<void> {
    const requestBody = {
      body: noteBodyInputValue
    };
    const response = await fetch('http://localhost:8080/notes/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 200) {
      await fetchNotes();
    }
  }

  async function handleClickCreateNote(): Promise<void> {
    await createNote();
    setNoteBodyInputValue('');
    setShowCreateModal(false)
  }

  async function deleteNote(): Promise<void> {
    const response = await fetch(`http://localhost:8080/notes/delete/${noteDeleteId}`);
    if (response.status === 200) {
      await fetchNotes();
    }
  }

  async function handleClickDeleteNote(): Promise<void> {
    await deleteNote();
    setNoteDeleteId(undefined);
    setShowDeleteModal(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{alignItems: "center"}}>
        <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Typography align='center' variant='h3' color='textPrimary'>
            Note App Test Front-End
          </Typography>
          {notes.map(it => <NoteCard note={it}/>)}
          <Button variant="outlined" onClick={() => fetchNotes()}>Fetch All Notes</Button>
          <Button variant="outlined" onClick={() => setShowCreateModal(true)}>Create Note</Button>
          <Button variant="outlined" onClick={() => setShowDeleteModal(true)}>Delete Note</Button>
          <CreateNoteDialog
            showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal}
            noteBodyInputValue={noteBodyInputValue} setNoteBodyInputValue={setNoteBodyInputValue}
            handleClickCreateNote={handleClickCreateNote} />
          <DeleteNoteDialog
            showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
            noteDeleteId={noteDeleteId} setNoteDeleteId={setNoteDeleteId}
            handleClickDeleteNote={handleClickDeleteNote} />
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
