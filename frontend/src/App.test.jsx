import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createTodo, getTodos, updateTodo, deleteTodo } from './api';
import App from './App';
import { vi } from 'vitest';

vi.mock('./api', () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});


test('fetches and displays todos on load', async () => {
  getTodos.mockResolvedValue({
    data: [{ id: 1, title: 'Test todo', completed: false }],
  });

  render(<App />);

  const todoItem = await screen.findByText('Test todo');

  expect(todoItem).toBeInTheDocument();
  expect(getTodos).toHaveBeenCalled();
});

test('toggles todo when checkbox is clicked', async () => {
  getTodos.mockResolvedValue({
    data: [{ id: 1, title: 'Checkbox todo', completed: false }],
  });

  render(<App />);

  const checkbox = await screen.findByRole('checkbox');

  await userEvent.click(checkbox);

  expect(updateTodo).toHaveBeenCalledWith(1, true);
});


test('deletes todo when delete button is clicked', async () => {
  getTodos.mockResolvedValue({
    data: [{ id: 1, title: 'Delete me', completed: false }],
  });

  render(<App />);

  const deleteButton = await screen.findByText('x');

  await userEvent.click(deleteButton);

  expect(deleteTodo).toHaveBeenCalledWith(1);
});


test('calls createTodo when adding todo', async () => {
  getTodos.mockResolvedValue({ data: [] });
  createTodo.mockResolvedValue({});

  render(<App />);

  const input = screen.getByPlaceholderText(/New todo/i);
  const button = screen.getByText(/Add/i);

  await userEvent.type(input, 'Nieuwe taak');
  await userEvent.click(button);

  expect(createTodo).toHaveBeenCalledWith('Nieuwe taak');
});