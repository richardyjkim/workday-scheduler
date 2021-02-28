// current time display on top
let currentDay = moment().format("dddd LL");
$("#currentDay").append(currentDay);

// task
let tasks;

let createTask = function(taskDescription, timeBlockId) {
  let taskDescriptionBox = $(timeBlockId).find(".description");
  taskDescriptionBox.text(taskDescription);
};


// save button
$(".saveBtn").on("click",function(event) {
  let parent = $(this).parent();
  let parent_id = parent[0].id;
  let saveDescription = parent.children(".description")[0].value;

  tasks[parent_id] = saveDescription;
  localStorage.setItem("tasks",JSON.stringify(tasks));
});

// load task
let loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  if (!tasks) {
    tasks = {};
  }

  $.each(tasks, function(hour, taskDescription) {
    let timeBlockId = $("#" + hour + "");
    createTask(taskDescription, timeBlockId);
  });
}; 

loadTasks();

