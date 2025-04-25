import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Note } from './types';

type NoteCardProps = {
  note: Note
}

export function NoteCard({ note }: NoteCardProps): React.JSX.Element {
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