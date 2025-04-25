import { useState } from 'react'
import { z } from "zod";
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';

const noteSchema = z.object({
  id: z.number().positive().int(),
  createdAt: z.coerce.date(),
  modifiedAt: z.coerce.date(),
  body: z.string(),
});
const pageInfoSchema = z.object({
  pageSize: z.number().positive().int().optional(),
  continuation:  z.number().nonnegative().int().optional(),
}).or(z.object({}));
const notesResponseSchema = z.object({
  notes: z.array(noteSchema),
  pageInfo: pageInfoSchema,
});
type Note = z.infer<typeof noteSchema>;
type NotesResponse = z.infer<typeof notesResponseSchema>;

function makeNoteCard(note: Note) {
  const noteCardId = `note-card-${note.id}`;

  return (
    <Box display="inline-block" key={noteCardId}>
      <Card id={noteCardId} data-testid={noteCardId} variant="outlined" style={{ display: 'inline-block' }} raised={true} sx={{ border: 2 }}>
        <CardContent>
          <Stack>
            <Typography variant='body1' color='textSecondary'>Note ID: {note.id}</Typography>
            <Typography variant='body1' color='textSecondary'>{note.body}</Typography>
            <Typography variant='body1' color='textSecondary'>Created at: {note.createdAt.toLocaleString()}</Typography>
            <Typography variant='body1' color='textSecondary'>Modified at: {note.modifiedAt.toLocaleString()}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

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
          {notes.map(it => makeNoteCard(it))}
          <Button variant="outlined" onClick={() => fetchNotes()}>Fetch All Notes</Button>
          <Button variant="outlined" onClick={() => setShowCreateModal(true)}>Create Note</Button>
          <Button variant="outlined" onClick={() => setShowDeleteModal(true)}>Delete Note</Button>
          <Dialog open={showCreateModal} onClose={() => setShowCreateModal(false)}>
            <DialogContent>
              <DialogContentText sx={{pb: 1}}>
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
              <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button onClick={() => handleClickCreateNote()}>Create</Button>
            </DialogActions>
          </Dialog>
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
        </Stack>
      </Container>
    </ThemeProvider>
  )
}

export default App
