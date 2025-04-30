import {fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react';
import App from './App';
import { createHandlers, DbNote, initialServerNotes, server } from '../mockServiceWorker';
import userEvent from '@testing-library/user-event';

let serverNotes: DbNote[];

describe('App', () => {
  beforeAll(() => {
    server.listen()
  })
  
  afterEach(() => {
    server.resetHandlers()
  })
  
  afterAll(() => {
    server.close()
  })
  
  beforeEach(() => {
    userEvent.setup();
    serverNotes = [...initialServerNotes];
    server.use(...createHandlers(serverNotes));
  })

  test('renders', () => {
    render(<App />)
    const component = screen.getByTestId('container');
    expect(component).toBeInTheDocument();
  })

  test('hardcoded note cards are present', () => {
    render(<App />)
    const component1 = screen.getByTestId('note-card--1');
    expect(component1).toBeInTheDocument();
    const component2 = screen.getByTestId('note-card--2');
    expect(component2).toBeInTheDocument();
  })

  test('fetch all notes button works', async () => {
    // Arrange
    render(<App />)

    // Act
    const button = screen.getByTestId('fetch-all-button');
    await userEvent.click(button);

    // Assert
    const note1 = await screen.findByTestId('note-card-1');
    expect(note1).toBeInTheDocument();
    const note7 = await screen.findByTestId('note-card-7');
    expect(note7).toBeInTheDocument();
  })

  test('Full create workflow works', async () => {
    // Arrange
    render(<App />)
    const newNoteText = `Created note ${new Date()}.`;

    // Act
    const button = screen.getByTestId('create-button');
    await userEvent.click(button);
    const createNoteDialog = await screen.findByTestId('create-note-dialog');
    expect(createNoteDialog).toBeInTheDocument();

    const createNoteInput = screen.getByTestId('create-note-input-body');
    await userEvent.type(createNoteInput, newNoteText);

    const createNoteCreateButton = screen.getByTestId('create-note-create-button');
    await userEvent.click(createNoteCreateButton);

    await waitForElementToBeRemoved(createNoteDialog);

    // Assert
    const note1 = await screen.findByTestId('note-card-1');
    expect(note1).toBeInTheDocument();
    const note7 = await screen.findByTestId('note-card-7');
    expect(note7).toBeInTheDocument();
    const newNote = await screen.findByText(newNoteText);
    expect(newNote).toBeInTheDocument();
  })

  test('Full delete workflow works', async () => {
    // Arrange
    render(<App />)
    const button = screen.getByTestId('fetch-all-button');
    await userEvent.click(button);
    expect(await screen.findByTestId('note-card-1')).toBeInTheDocument();
    expect(await screen.findByTestId('note-card-7')).toBeInTheDocument();

    // Act
    const deleteButton = screen.getByTestId('delete-button');
    await userEvent.click(deleteButton);
    const deleteNoteDialog = await screen.findByTestId('delete-note-dialog');
    expect(deleteNoteDialog).toBeInTheDocument();

    const deleteNoteInput = screen.getByTestId('delete-note-id-field');
    expect(deleteNoteInput).toBeInTheDocument();
    const deleteNoteInputInput = deleteNoteInput.querySelector('input') as HTMLInputElement;
    await userEvent.type(deleteNoteInput, '1');
    fireEvent.change(deleteNoteInputInput, { target: {value: '1'}})

    const deleteNoteDeleteButton = screen.getByTestId('delete-note-delete-button');
    await userEvent.click(deleteNoteDeleteButton);

    await waitForElementToBeRemoved(deleteNoteDialog);

    // Assert
    const note1 = screen.queryByTestId('note-card-1');
    expect(note1).not.toBeInTheDocument();
    const note7 = screen.getByTestId('note-card-7');
    expect(note7).toBeInTheDocument();
  })

  test('Full update workflow works', async () => {
    // Arrange
    const updateNoteText = ` Updated note AABB`;
    render(<App />)
    const button = screen.getByTestId('fetch-all-button');
    await userEvent.click(button);
    expect(await screen.findByTestId('note-card-1')).toBeInTheDocument();
    expect(await screen.findByTestId('note-card-7')).toBeInTheDocument();

    // Act
    const updateButton = screen.getByTestId('update-button');
    await userEvent.click(updateButton);
    const updateNoteDialog = await screen.findByTestId('update-note-dialog');
    expect(updateNoteDialog).toBeInTheDocument();

    const updateNoteInput = screen.getByTestId('update-note-id-field');
    expect(updateNoteInput).toBeInTheDocument();
    const updateNoteInputInput = updateNoteInput.querySelector('input') as HTMLInputElement;
    await userEvent.type(updateNoteInput, '7');
    fireEvent.change(updateNoteInputInput, { target: {value: '7'}});
    
    const updateNoteBodyInput = await screen.findByTestId('update-note-input-body');
    expect(updateNoteBodyInput).toBeInTheDocument();
    await userEvent.type(updateNoteBodyInput, updateNoteText);

    const updateNoteUpdateButton = screen.getByTestId('update-note-update-button');
    await userEvent.click(updateNoteUpdateButton);

    await waitForElementToBeRemoved(updateNoteDialog);

    // Assert
    const note1 = screen.getByTestId('note-card-1');
    expect(note1).toBeInTheDocument();
    const note7 = await screen.findByTestId('note-card-7');
    expect(note7).toBeInTheDocument();
    const updatedNote = await screen.findByText('New note updated 2' + updateNoteText);
    expect(updatedNote).toBeInTheDocument();
  })
})