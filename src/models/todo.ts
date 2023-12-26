class Todo {
  constructor(
    public id: number,
    public title: string,
    public done: boolean = false
  ) {
    this.done = false
    this.title = title
  }
}

export default Todo
