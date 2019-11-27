class Exception extends Error {
  message: string = '';
}

export class DatabaseConnectionException extends Exception {
  message = `We can't connect to DB`;
}

export class CreatingTableException extends Exception {
  message = `We can't create table`;
}

export class DBQueryException extends Exception {
  message = `We can't make query to DB`;
}
