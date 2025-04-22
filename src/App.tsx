import { useState } from 'react'
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


class Note {
  id: number;
  createdAt: Date;
  modifiedAt: Date;
  body: string;

  constructor(id: number, createdAt: Date, modifiedAt: Date, body: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.modifiedAt = modifiedAt;
    this.body = body;
  }
}

function NoteCard(note: Note) {
  const noteCardId = `note-card-${note.id}`;

  return (
    <Box display="inline-block">
      <Card id={noteCardId} data-testid={noteCardId} variant="outlined" style={{ display: 'inline-block' }}>
        <CardContent>
          <Stack>
            <span>Note ID: {note.id}</span>
            <span>{note.body}</span>
            <span>Created at: {note.createdAt.toLocaleString()}</span>
            <span>Modified at: {note.modifiedAt.toLocaleString()}</span>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

const hardCodedNotes: Note[] = [
  {
    "id": 1,
    "createdAt": new Date("2025-04-17T22:27:01.757638Z"),
    "modifiedAt": new Date("2025-04-17T22:27:01.757638Z"),
    "body": "Note 1 body"
  },
  {
    "id": 2,
    "createdAt": new Date("2025-04-17T23:27:01.757638Z"),
    "modifiedAt": new Date("2025-04-17T23:27:01.757638Z"),
    "body": "Note 2 body"
  }
]

function App() {
  const [notes, setNotes] = useState<Note[]>(hardCodedNotes);

  return (
    <Container maxWidth="lg" sx={{alignItems: "center"}}>
      <Stack spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography align='center' variant='h3'>Note App Test Front-End</Typography>
        {notes.map(it => NoteCard(it))}
      </Stack>
    </Container>
  )
}

export default App
