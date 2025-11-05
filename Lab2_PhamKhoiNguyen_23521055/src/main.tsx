/** @jsx createElement */
import { Counter } from "./counter";
import { Dashboard } from "./dashboard";
import { createElement, mount } from "./jsx-runtime";
import "./style.css"; // 👈 Thêm dòng này để import CSS
import { TodoApp } from "./todo-app";

const App = () => (
  <div className="app">
    <h1>Lab 2</h1>
    <h1>2.1</h1>
    <Counter initialCount={0} />
    <h1>2.2</h1>
    <TodoApp />
    <h1>2.3</h1>
    <Dashboard />
  </div>
);

const root = document.getElementById("root")!;
mount(<App />, root);
