import {SQLiteDatabase} from "react-native-sqlite-storage";
import {CreatingTableException, DBQueryException} from "../Exceptions";

const CREATE_TODO_TABLE_QUERY = 'CREATE TABLE IF NOT EXISTS Todo (id INTEGER PRIMARY KEY AUTOINCREMENT, title text NOT NULL, priority text NOT NULL, status text NOT NULL, description text NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)';

class TodoRepository {
  createTableIfNonExists = async (db: SQLiteDatabase) => {
    try {
      // try to invoke select to check if table exists
      await db.executeSql('SELECT 1 FROM Todo LIMIT 1');
      console.log('Todo List already exists');
    } catch (e) {
      try {
        await db.transaction((tx) => {
          tx.executeSql(CREATE_TODO_TABLE_QUERY);
        });
        console.log("Todo Table created successfully");
      } catch (e) {
        console.log(`Problem with creating Todo table`, e);
        throw new CreatingTableException();
      }
    }
  };

  drop = async (db: SQLiteDatabase) => {
    try {
      await db.executeSql('DROP TABLE Todo');
    } catch (e) {
      console.log(`Problem with drop DB request`, e);
      throw new DBQueryException();
    }
  };

  findAll = async (db: SQLiteDatabase): Promise<TodoDB[]> => {
    try {
      const todos = await db.executeSql('SELECT * FROM Todo');
      let items: TodoDB[] = [];

      for (let i = 0; i < todos[0].rows.length; i++) {
        items.push(todos[0].rows.item(i));
      }

      return items;
    } catch (e) {
      console.log(`Problem with findAll DB request`, e);
      throw new DBQueryException();
    }
  };

  findOne = async (db: SQLiteDatabase, id: number): Promise<TodoDB> => {
    try {
      const todo = await db.executeSql('SELECT * FROM Todo WHERE id=?', [id]);

      return todo[0].rows.item(0);
    } catch (e) {
      console.log(`Problem with findAll DB request`, e);
      throw new DBQueryException();
    }
  };

  add = async (db: SQLiteDatabase, item: TodoNewlyCreated): Promise<number> => {
    try {
      const result = await db.executeSql('INSERT INTO Todo (title, priority, status, description) VALUES (?, ?, ?, ?)', [item.title, item.priority, item.status, item.description]);

      return result[0].insertId;
    } catch (e) {
      console.log(`Problem with add item DB request`, e);
      throw new DBQueryException();
    }
  };

  update = async (db: SQLiteDatabase, item: Todo) => {
    try {
      await db.executeSql('UPDATE Todo SET title=?, priority=?, status=?, description=? WHERE id=?', [item.title, item.priority, item.status, item.description, item.id]);
    } catch (e) {
      console.log(`Problem with update item DB request`, e);
      throw new DBQueryException();
    }
  };

  remove = async (db: SQLiteDatabase, itemId: number) => {
    try {
      await db.executeSql('DELETE FROM Todo WHERE id=?', [itemId]);
    } catch (e) {
      console.log(`Problem with remove item DB request`, e);
      throw new DBQueryException();
    }
  };
}

export default new TodoRepository();
