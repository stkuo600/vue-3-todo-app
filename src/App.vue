<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import Todo from './models/todo'
import { useTodosStore } from './stores/todoStore'

const newTodo = ref(new Todo(-1, '', false))
const store = useTodosStore()

const { todos } = storeToRefs(store)
//const todos = ref(JSON.parse(localStorage.getItem('todos') || '[]'))

const addTodo = () => {
  newTodo.value.id = todos.value.length
  todos.value.push(newTodo.value)
  store.saveTodos()
  newTodo.value = new Todo(-1, '', false)
}

const removeTodo = (todo: Todo) => {
  todos.value.splice(todos.value.indexOf(todo), 1)
  store.saveTodos()
}

const toggleTodo = (todo: Todo) => {
  todo.done = !todo.done
  store.saveTodos()
}

// const saveTodos = () => {
//   localStorage.setItem('todos', JSON.stringify(todos.value))
// }
</script>

<template>
  <h1>ToDo App</h1>
  <form>
    <label>New Todo</label>
    <input v-model="newTodo.title" autocomplete="off" name="newTodo" />
    <button type="button" @click="addTodo">Add</button>
  </form>
  <h2>ToDo List</h2>
  <ul>
    <li v-for="todo in todos" :key="todo.id">
      <span :class="{ done: todo.done }" @click="toggleTodo(todo)">{{ todo.title }}</span>
      <button type="button" @click="removeTodo(todo)">Remove</button>
    </li>
  </ul>
</template>

<style lang="scss">
$border: 2px solid
  rgba(
    $color: white,
    $alpha: 0.35
  );
$size1: 6px;
$size2: 12px;
$size3: 18px;
$size4: 24px;
$size5: 48px;
$backgroundColor: #27292d;
$textColor: white;
$primaryColor: #a0a4d9;
$secondaryColor: #1f2023;
body {
  margin: 10;
  padding: 10;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: $backgroundColor;
  color: $textColor;
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    h1 {
      font-weight: bold;
      text-align: center;
      margin-bottom: 28px;
    }

    form {
      display: flex;
      flex-direction: column;
      width: 100%;
      label {
        font-size: 14px;
        font-weight: bold;
      }
      input,
      button {
        height: $size5;
        box-shadow: none;
        outline: none;
        padding-left: $size2;
        padding-right: $size2;
        border-radius: $size1;
        font-size: 18px;
        margin-top: $size1;
        margin-bottom: $size2;
      }
      input {
        background-color: transparent;
        border: $border;
        color: inherit;
      }
    }

    button {
      cursor: pointer;
      background-color: $primaryColor;
      border: 1px solid $primaryColor;
      color: $secondaryColor;
      font-weight: bold;
      outline: none;
      border-radius: $size1;
    }

    ul {
      padding: 10px;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $border;
        padding: $size2 $size4;
        border-radius: $size1;
        margin-bottom: $size2;
        span {
          cursor: pointer;
        }
        .done {
          text-decoration: line-through;
        }
        button {
          font-size: $size2;
          padding: $size1;
        }
      }
    }

    h2 {
      font-size: 1.5em;
      border-bottom: $border;
      padding-bottom: $size1;
      text-align: center;
      margin-bottom: 22px;
    }
  }
}
</style>
