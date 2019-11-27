import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {DatabaseConnectionException} from "../Exceptions";
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default async (): Promise<SQLiteDatabase> => {
  const dbName = 'ToDoList.db';
  const dbVersion = '1.0';
  const dbDisplayName = 'Todo List database';
  const dbSize = 200000;

  let db: SQLiteDatabase;

  try {
    await SQLite.echoTest();
  } catch (e) {
    console.log(`SQLite Echo Test don't work - we can't connect with DB`, e);
    throw new DatabaseConnectionException();
  }

  try {
    db = await SQLite.openDatabase(dbName, dbVersion, dbDisplayName, dbSize);
  } catch (e) {
    console.log(`We can't open ${dbName}`, e);
    throw new DatabaseConnectionException();
  }

  return db;
};
