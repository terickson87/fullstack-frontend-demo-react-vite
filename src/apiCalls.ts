import { Note, NotesResponse, notesResponseSchema } from './types';

export async function fetchAllNotes(): Promise<Note[]> {
  const response = await fetch('http://localhost:8080/notes/all');
  const json = await response.json();
  const validated: NotesResponse = notesResponseSchema.parse(json);
  const notes: Note[] = validated.notes;

  return notes;
}

export async function createNote(noteBodyInputValue: string): Promise<Response> {
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
  return response;
}

export async function deleteNote(noteId: number | undefined): Promise<Response> {
  const response = await fetch(`http://localhost:8080/notes/delete/${noteId}`);
  return response;
}

export async function getNoteById(noteId: number | undefined): Promise<Response> {
  const response = await fetch(`http://localhost:8080/notes/${noteId}`);
  return response;
}

export async function updateNote(noteId: number | undefined, noteBodyInputValue: string): Promise<Response> {
  const requestBody = {
    body: noteBodyInputValue
  };
  const response = await fetch(`http://localhost:8080/notes/update/${noteId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody),
  });
  return response;
}