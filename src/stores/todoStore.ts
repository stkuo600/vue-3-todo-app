import type Todo from '@/models/todo'
import { defineStore } from 'pinia'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: JSON.parse(localStorage.getItem('todos') || '[]')
  }),

  actions: {
    addTodo(todo: Todo) {
      this.todos.push(todo)
    },
    removeTodo(todo: Todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },
    toggleTodo(todo: Todo) {
      todo.done = !todo.done
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    }
  }
})
