// require express for setting up the express server
const express = require("express");

const path = require("path");

// set up the port number
const port = 1000;

// importing the DataBase
const db = require("./config/mongoose");

// importng the Schema For tasks
const Task = require("./models/task");

// using express
const app = express();

// using static files
app.use(express.static("assets"));

// to use encrypted data
app.use(express.urlencoded());

// set up the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// rendering the App Page
app.get("/", function (req, res) {
  Task.countDocuments({}, function (err, taskCount) {
    if (err) {
      console.log("Error in fetching tasks from db");
      return;
    }

    Task.find({})
      .sort({ date: 1 }) // Sort tasks by date in ascending order
      .exec(function (err, tasks) {
        if (err) {
          console.log("Error in fetching tasks from db");
          return;
        }
        const completedTasks = tasks.filter((task) => task.isCompleted);
        // console.log(completedTasks.length);
        return res.render("cont", {
          tittle: "TODO App",
          task: tasks,
          taskCount: taskCount,
          completedTaskCount: completedTasks.length,
        });
      });
  });
});

// Update task
app.post("/update-task", function (req, res) {
  var taskId = req.query.id;
  var isCompleted = req.query.isCompleted === "true";

  Task.findByIdAndUpdate(
    taskId,
    { isCompleted: isCompleted },
    function (err, task) {
      if (err) {
        console.log("Error in updating the task");
        return res.status(500).json({ success: false, error: "Server error" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Task updated successfully" });
    }
  );
});

// creating Tasks
app.post("/create-task", function (req, res) {
  Task.create(
    {
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    },
    function (err, newtask) {
      if (err) {
        console.log("error in creating task", err);
        return;
      }
      return res.redirect("back");
    }
  );
});

// deleting Tasks
app.get("/delete-task", function (req, res) {
  // get the id from query
  var id = req.query;

  // checking the number of tasks selected to delete
  var count = Object.keys(id).length;
  for (let i = 0; i < count; i++) {
    // finding and deleting tasks from the DB one by one using id
    Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
      if (err) {
        console.log("error in deleting task");
      }
    });
  }
  return res.redirect("back");
});

// make the app to listen on asigned port number
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
  }
  console.log(`Server is running on port : ${port}`);
});
