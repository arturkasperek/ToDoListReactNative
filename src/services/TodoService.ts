import TodoRepository from '../database/TodoRepository';
import {SQLiteDatabase} from "react-native-sqlite-storage";

class TodoService {
  db: SQLiteDatabase;

  constructor(db: SQLiteDatabase) {
    this.db = db;
  }

  getOne = async (id: number): Promise<Todo> => {
    const todo = await TodoRepository.findOne(this.db, id);

    return {
      id: todo.id,
      title: todo.title,
      priority: todo.priority,
      status: todo.status,
      description: todo.description,
    }
  };

  getAll = async (): Promise<TodoBasic[]> => {
    const todos = await TodoRepository.findAll(this.db);

    return todos.map(i => ({
      id: i.id,
      title: i.title,
      priority: i.priority,
      status: i.status,
    }));
  };

  add = async (todoToAdd: TodoNewlyCreated): Promise<Todo> => {
    const insertId = await TodoRepository.add(this.db, todoToAdd);
    const todo = this.getOne(insertId);

    return todo;
  };

  update = async (todoToUpdate: Todo): Promise<Todo> => {
    await TodoRepository.update(this.db, todoToUpdate);
    const todo = this.getOne(todoToUpdate.id);

    return todo;
  };

  removeOne = async (itemId: number): Promise<TodoBasic[]> => {
    await TodoRepository.remove(this.db, itemId);
    const items = await this.getAll();

    return items;
  };
}

export default TodoService;
