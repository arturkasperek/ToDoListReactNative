interface TodoCommonFields {
  id: number;
  title: string;
  priority: string;
  status: string;
  description: string;
}

interface TodoDB extends TodoCommonFields {
  createdAt: number;
}

interface Todo extends TodoCommonFields {}
type TodoNewlyCreated = Omit<Todo, 'id'>;
type TodoBasic = Omit<TodoCommonFields, 'description'>;
