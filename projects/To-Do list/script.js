function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create new list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Log the task to the console
    console.log("Task Added:", taskText);

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
        console.log("Task Removed:", taskText);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input field after adding task
    taskInput.value = "";
}
