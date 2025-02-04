document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("input-form");
  const taskInput = document.getElementById("task-input");
  const priorityDropdown = document.getElementById("priority-dropdown");
  const navLinks = document.querySelectorAll(".nav-link");
  const section = document.querySelectorAll(".section");
  const taskList = document.getElementById("ul");
  const reportallTask = document.getElementById("report-items");
  const completedTask = document.getElementById("completed-items");
  const incompletedTask = document.getElementById("incompleted-items");
  const editProfileBtn = document.getElementById("edit-profile");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const completedCount = document.getElementById("completed-count");
  const pendingCount = document.getElementById("pending-count");

  const tasks = [];
  const doneTasks = [];

  // <========section switching=========>

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
  
      const targetSectionId = link.getAttribute("data-section");
  
      section.forEach((sec) => {
        sec.classList.remove("active");
        sec.style.display = "none"; 
      });
  
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.classList.add("active");
        targetSection.style.display = "block"; 
      }
  
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
  
      if (targetSectionId === "mytask-screen") {
        displayReport(tasks, reportallTask);
      } else if (targetSectionId === "report-screen") {
        displayReport(doneTasks, completedTask);
        displayReport(tasks, incompletedTask);
      }
    });
  });

  //<=========Task list ===========>

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = taskInput.value.trim();
    const priority = priorityDropdown.value;

    if (task === "") {
      alert("Please Enter a task");
      return;
    }

    tasks.push({ task, priority });

    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    displayTask();

    taskInput.value = "";
  });

  function displayTask() {
    taskList.innerHTML = "";

    tasks.forEach((taskObj, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${taskObj.task}`;

      if (taskObj.priority === "high") {
        listItem.classList.add("high");
      } else if (taskObj.priority === "medium") {
        listItem.classList.add("medium");
      } else if (taskObj.priority === "low") {
        listItem.classList.add("low");
      }

      const buttonContainer = document.createElement("div");
      buttonContainer.style.display = "flex";
      buttonContainer.style.gap = "10px";

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.style.marginLeft = "10px";
      deleteButton.style.backgroundColor = "#f44336"; // Red button
      deleteButton.style.color = "white";
      deleteButton.style.border = "none";
      deleteButton.style.padding = "5px 10px";
      deleteButton.style.cursor = "pointer";
      deleteButton.style.borderRadius = "5px";
      deleteButton.style.fontSize = "1.3rem";

      const doneButton = document.createElement("button");
      doneButton.textContent = "Done";
      doneButton.style.marginLeft = "10px";
      doneButton.style.backgroundColor = "#f44336"; // Red button
      doneButton.style.color = "white";
      doneButton.style.border = "none";
      doneButton.style.padding = "5px 10px";
      doneButton.style.cursor = "pointer";
      doneButton.style.borderRadius = "5px";
      doneButton.style.fontSize = "1.3rem";

      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        displayTask();
      });

      doneButton.addEventListener("click", () => {
        doneTasks.push(taskObj);
        tasks.splice(index, 1);
        displayTask();
        console.log("Done Tasks:", doneTasks);
      });

      buttonContainer.appendChild(doneButton);
      buttonContainer.appendChild(deleteButton);

      listItem.appendChild(buttonContainer);
      taskList.appendChild(listItem);

      console.log(taskList);
    });

    updateTaskCounts();
  }

  function updateTaskCounts() {
    completedCount.textContent = doneTasks.length;
    pendingCount.textContent = tasks.length;
  }

  editProfileBtn.addEventListener("click", function () {
    const newName = prompt("Enter your name:", profileName.textContent);
    if (newName) {
      profileName.textContent = newName;
    }

    const newEmail = prompt("Enter your email:", profileEmail.textContent);
    if (newEmail) {
      profileEmail.textContent = newEmail;
    }
  });

  // navLinks.forEach((links) => {
  //   links.addEventListener("click", (event) => {
  //     if (targetSection === "profile-screen") {
  //       updateTaskCounts();
  //     }
  //   });
  // });

  function displayReport(listtask, loadedhtml) {
    loadedhtml.innerHTML = "";

    listtask.forEach((taskObj, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${taskObj.task}`;
      if (taskObj.priority === "high") {
        listItem.classList.add("high");
      } else if (taskObj.priority === "medium") {
        listItem.classList.add("medium");
      } else if (taskObj.priority === "low") {
        listItem.classList.add("low");
      }
      loadedhtml.append(listItem);
    });
  }
});
