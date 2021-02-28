// current time display on top
let currentDay = moment().format("dddd LL");
$("#currentDay").append(currentDay);

// task
let tasks;

// save button
$(".saveBtn").on("click",function(event) {
  let parent = $(this).parent();

  let taskTextArea = parent.children(".description")[0];
  let taskTextAreaId = taskTextArea.id;
  let taskTextAreaValue = taskTextArea.value;

  tasks[taskTextAreaId] = taskTextAreaValue;
  localStorage.setItem("tasks",JSON.stringify(tasks));
});

// load task
let loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {};
  }

  $.each(tasks, function(hour, taskDescription) {
    let taskTextAreaId = $("#" + hour + "");
    $(taskTextAreaId).text(taskDescription);
  });
}; 

let auditTask = function() {
// color check
  let timeBlocks = $(".time-block");
  let now = parseInt(moment().format("H"));


  $.each(timeBlocks, function (index, timeBlock) {
    let timeBlockHour = parseInt($(timeBlock).attr("hour"));
    if (timeBlockHour == now){
      
      $(timeBlock).addClass("present");
    
    } else if (timeBlockHour < now) {
      $(timeBlock).addClass("past")

    } else if (timeBlockHour > now) {
      $(timeBlock).addClass("future")
    }
  });
}

loadTasks();
auditTask();

setInterval(function(){
  auditTask();},3600000);
