const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");
const filters = document.querySelectorAll(".filters button");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  let visible = 0;

  tasks.forEach((task, i) => {
    if (
      filter === "completed" && !task.done ||
      filter === "pending" && task.done
    ) return;

    visible++;
    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";
    li.innerHTML = `
      <strong>${task.text}</strong>
      <small> (${task.time})</small>
      <br>
      <button onclick="toggle(${i})">✔</button>
      <button onclick="edit(${i})">✎</button>
      <button onclick="removeTask(${i})">✖</button>
    `;
    list.appendChild(li);
  });

  counter.textContent = `Showing ${visible} of ${tasks.length} tasks`;
}

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({
    text,
    done: false,
    time: new Date().toLocaleString()
  });

  input.value = "";
  save();
  render();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  save();
  render();
}

function edit(i) {
  const newText = prompt("Edit task", tasks[i].text);
  if (newText) {
    tasks[i].text = newText;
    save();
    render();
  }
}

function removeTask(i) {
  tasks.splice(i, 1);
  save();
  render();
}

filters.forEach(btn => {
  btn.onclick = () => {
    filter = btn.dataset.filter;
    render();
  };
});

document.getElementById("addBtn").onclick = addTask;
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

render();
