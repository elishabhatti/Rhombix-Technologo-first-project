// getting elemets
const addTaskInput = document.querySelector("#addTaskInput");
const addTask = document.querySelector("#addTask");
const listItem = document.querySelector("#listItem");

// function to display listItem
const displayTask = () => {
  // accessing input value
  const todoText = addTaskInput.value.trim();
  // this is for duplicate items
  let isDuplicate = false;
  const items = Array.from(listItem.getElementsByTagName("li"));
  const tasks = [];
  items.forEach((item) => {
    tasks.push(item.textContent);
    if (item.textContent.includes(todoText)) {
      isDuplicate = true;
    }
  });
  // if input value is empty and the user click the add button it should display  error
  if (todoText === "") {
    alert("Input field in empty");
    // if is the user put the same task again it should display error
  } else if (isDuplicate) {
    alert("This task already exists in your list");
    // if everything is right it will gonna create tasks
  } else {
    // creating li for the task text
    const li = document.createElement("li");
    // giving the text content of the li input value
    li.textContent = todoText;

    // creating remove btn for the to remove the list item
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    removeBtn.classList.add("removeBtn");

    removeBtn.addEventListener("click", () => {
      li.remove();
      completeBtn.remove();
      removeBtn.remove();
      saveData();
    });

    // creating the complete btn to complete the tasks
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon>';
    completeBtn.classList.add("completeBtn");

    completeBtn.addEventListener("click", () => {
      li.classList.toggle("completeTask");
      saveData();
    });

    // creating the edit btn to edit the tasks
    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    editBtn.classList.add("editBtn");

    editBtn.addEventListener("click", () => {
      const currentText = li.firstChild.textContent; // Get current text of the task
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentText;
      input.classList.add("editInputStyle")
      li.firstChild.remove(); // Remove the original text
      li.insertBefore(input, li.firstChild); // Insert the input field in place of text

      input.addEventListener("blur", () => {
        const updatedText = input.value.trim();
        if (updatedText !== "") {
          li.firstChild.remove(); // Remove the input field
          li.insertBefore(document.createTextNode(updatedText), li.firstChild); // Set the updated text
        } else {
          alert("Task cannot be empty");
          input.focus(); // Focus back to input if empty
        }
      });

      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          input.blur(); // Trigger blur event on Enter key
        }
      });
    });

    // creating the div to insert all the list item buttons inside
    const todoBtnContainer = document.createElement("div");
    todoBtnContainer.classList.add("todoBtnContainer");
    // appending the removebtn , completebtn and the editbtn to the div
    todoBtnContainer.appendChild(removeBtn);
    todoBtnContainer.appendChild(completeBtn);
    todoBtnContainer.appendChild(editBtn);

    // appending the li in the ul
    listItem.appendChild(li);
    li.appendChild(todoBtnContainer);
    addTaskInput.value = "";
    saveData();
  }
};

// function for saveing data
const saveData = () => {
  localStorage.setItem("data", listItem.innerHTML);
};

// function for showing tasks
const showTask = () => {
  const savedData = localStorage.getItem("data");
  if (savedData) {
    listItem.innerHTML = savedData;

    // After setting innerHTML, we need to reattach event listeners for each task
    const items = Array.from(listItem.getElementsByTagName("li"));
    items.forEach((item) => {
      const removeBtn = item.querySelector(".removeBtn");
      const completeBtn = item.querySelector(".completeBtn");
      const editBtn = item.querySelector(".editBtn");

      removeBtn.addEventListener("click", () => {
        item.remove();
        saveData();
      });

      completeBtn.addEventListener("click", () => {
        item.classList.toggle("completeTask");
        saveData();
      });

      editBtn.addEventListener("click", () => {
        editTask(item);
      });
    });
  }
};
showTask();

// event for the add task btn
addTask.addEventListener("click", displayTask);

// event for the Enter
addTaskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    displayTask();
  }
});
