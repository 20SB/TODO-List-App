// Set abckground color of each task category
{
  const taskCategoryElements = document.querySelectorAll(".task-category");

  taskCategoryElements.forEach((element) => {
    // console.log(element);
    const category = element.getAttribute("data-category").toLowerCase();
    // console.log(category);
    switch (category) {
      case "school":
        element.style.backgroundColor = "#ffd49f";
        break;
      case "work":
        element.style.backgroundColor = "yellow";
        break;
      case "personal":
        element.style.backgroundColor = "cyan";
        break;
      case "cleaning":
        element.style.backgroundColor = "#b3ffa9";
        break;
      case "other":
        element.style.backgroundColor = "#ff9fec";
        break;
      default:
        element.style.backgroundColor = "white"; // Default color if no category match
        break;
    }
  });
}

// Set the size of task list and its inside div(gradient-container)
{
  window.addEventListener("DOMContentLoaded", setTaskListHeight);
  window.addEventListener("resize", setTaskListHeight);

  function setTaskListHeight() {
    const container = document.getElementById("container");
    const heading = document.getElementById("heading");
    const inpForm = document.getElementById("inpForm");
    const dlBtndiv = document.getElementById("dlBtndiv");
    const taskList = document.getElementById("taskList");
    const gradientContainer = document.querySelector(".gradient-container");

    // Assign the initial height of taskList to the gradientContainer
    gradientContainer.style.height = `${taskList.offsetHeight}px`;
    // console.log("before ", gradientContainer.style.height);

    // Calculate the total height of the elements to subtract from the container height
    const totalHeight =
      heading.offsetHeight + inpForm.offsetHeight + dlBtndiv.offsetHeight;

    // Calculate the desired height of the taskList
    const taskListHeight = container.offsetHeight - totalHeight - 10;

    // Assign the calculated height to the taskList
    taskList.style.height = taskListHeight + "px";
  }
}

// toogle select to mark tasks as completed or not
{
  // Add an event listener to handle checkbox click event
  document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".custom-checkbox");
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("click", function (event) {
        const taskId = event.target.getAttribute("data-taskid");
        const taskDescription = document.querySelector(
          `label[for="${taskId}"].task-description`
        );
        taskDescription.classList.toggle("text-line-through");

        const isCompleted = event.target.checked;

        // Send a request to update the task's isCompleted field
        fetch(`/update-task?id=${taskId}&isCompleted=${isCompleted}`, {
          method: "POST",
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            // console.log("Task updated successfully");
            alert("Task Updated Successfully");
          })
          .catch(function (error) {
            console.log("Error updating task:", error);
          });
      });
    });

    // Apply initial line-through effect to labels if checkbox is checked on page load
    checkboxes.forEach(function (checkbox) {
      const taskId = checkbox.getAttribute("data-taskid");
      const taskDescription = document.querySelector(
        `label[for="${taskId}"].task-description`
      );
      if (checkbox.checked) {
        taskDescription.classList.add("text-line-through");
      }
    });
  });
}
