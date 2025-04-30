import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

export type DbNote = {
  id: number;
  createdAt: string;
  modifiedAt: string;
  body: string;
};

export const initialServerNotes: DbNote[] = [
  {
    id: 1,
    createdAt: "2025-04-17T22:27:01.757638Z",
    modifiedAt: "2025-04-17T22:27:01.757638Z",
    body: "testBody",
  },
  {
    id: 7,
    createdAt: "2025-04-25T22:03:13.647653Z",
    modifiedAt: "2025-04-25T22:04:16.259036Z",
    body: "New note updated 2",
  },
];

export function createHandlers(serverNotes: DbNote[]) {
  return [
    http.get('http://localhost:8080/notes/all', () => {
      return HttpResponse.json({
        "notes": serverNotes,
        "pageInfo": {}
      })
    }),
    http.post('http://localhost:8080/notes/new', async (info) => {
      const request = info.request;
      const newNote = (await request.json()) as Pick<DbNote, 'body'>;
      const maxId = serverNotes.reduce((max, note) => Math.max(max, note.id), 0);
      const newId = maxId + 1;
    
      const noteToAdd = {
        id: newId,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        body: newNote.body
      };
    
      serverNotes.push(noteToAdd);
    
      return HttpResponse.json(noteToAdd, { status: 201 });
    }),
    http.get('http://localhost:8080/notes/delete/:id', (info) => {
      const url = new URL(info.request.url);
      const id = url.pathname.split('/').pop();

      if (!id) {
        return HttpResponse.json({ error: 'Invalid note ID' }, { status: 400 });
      }

      const noteIndex = serverNotes.findIndex((note) => note.id === parseInt(id, 10));

      if (noteIndex === -1) {
        return HttpResponse.json({ error: 'Note not found' }, { status: 404 });
      }

      serverNotes.splice(noteIndex, 1); // Remove the note from the array

      return HttpResponse.json({ message: 'Note deleted successfully' }, { status: 200 });
    }),
    http.post('http://localhost:8080/notes/update/:id', async (info) => {
      const url = new URL(info.request.url);
      const idStr = url.pathname.split('/').pop() as string;

      if (!idStr) {
        return HttpResponse.json({ error: 'Invalid note ID' }, { status: 400 });
      }

      const id = parseInt(idStr);
      const request = info.request;
      const newBody = (await request.json()) as Pick<DbNote, 'body'>;
      const matchingNote = serverNotes.filter( it => it.id === id)[0];
      const matchingIndex = serverNotes.indexOf(matchingNote);
    
      const noteToAdd = {
        id,
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
        body: newBody.body
      };
    
      serverNotes.splice(matchingIndex, 1, noteToAdd);
    
      return HttpResponse.json(noteToAdd, { status: 200 });
    }),
  ];
}

export const server = setupServer();