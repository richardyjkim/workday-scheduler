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

// color check
let timeColor =$(".time-block");
let now = parseInt(moment().format("H"));

$.each(timeColor, function (i,hour){
  let hourId = parseInt($(this).attr("id"));
  console.log(this);
  if (hourId == now){
    $(this).closest("description").addClass("present")
    $(this).addClass("present");
   
  } else if (hourId < now) {
    $(this).addClass("past")

  } else if (hourId > now) {
    $(this).addClass("future")
  }
});

loadTasks();

