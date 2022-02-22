//Initialise the TaskManager class from taskManager.js
const taskManager = new TaskManager();

//load the tasks with taskManager.load() and render them with taskManager.render().
taskManager.load();
taskManager.render();

// display date
const date = new Date;
document.getElementById("date").innerHTML = date.toLocaleDateString("en-GB");

// Date picker for due date can only start from current date
let today = new Date().toISOString().split('T')[0];
document.getElementsByName("dueDate")[0].setAttribute('min', today);

// Access through DOM element of each value passing into the form
const newTaskNameInput = document.querySelector('#newTaskNameInput');
const description = document.querySelector('#description');
const assigned = document.querySelector('#assigned');
const dueDate = document.querySelector('#dueDate');
const astatus = document.querySelector('#astatus');

//submit form.
//Form validition. if form inpujt doesn't meet the condition, form won't be submitted. With an error alert.
//Once success will alert the submitted message.
//new task wil be save to local storage and render. 
function submitForm() {
    //console.log(newTaskNameInput.value);
    if (newTaskNameInput.value.length < 5 || description.value.length < 5 || assigned.value.length < 5 || 
        dueDate.value.length === 0 || astatus.value.length === 0 )
    {
        alert("Invalid Input!(all field needs to be more than 5 characters)");
    } else {
        taskManager.addTask(newTaskNameInput.value, description.value, assigned.value, dueDate.value, astatus.value);
        taskManager.save();
        taskManager.render();
        console.log(taskManager);
        alert('Your task is submitted');
        document.querySelector("form").reset();
    }
}

//submit button with eventListener
let submit = document.getElementById('submit');
submit.addEventListener("click", function(event){
    event.preventDefault();
    submitForm();
});

//Task 8 Done button. Update a task, add event listener to task-list
//Using the event.target, using an if statement, check if the target's classList contains the class we added to the button, 'done-button'. 
//If the classList contains 'done-button', we know we clicked on the "Done" button from earlier!
//Use DOM Traversal, such as the parentElement property of the target (Node.parentElement) to traverse the DOM and find the task's element
const taskList = document.querySelector("#task-list");
taskList.addEventListener('click', (event) => {
if(event.target.classList.contains("done-button")){
    const doneParentTask = event.target.parentElement.parentElement.parentElement;
    const taskId = doneParentTask.dataset.taskId;
    const task = taskManager.getTaskById(taskId);
    task.status = "Done";
    taskManager.save();
    taskManager.render();
}
//10 Dlete button
// Find the EventListener for the click event on the Tasks List
// Check if the event.target.classList contains the class 'delete-button'.
// If it does, get the parentTask
// Get the taskId of the parent task from its data-task-id property
// Delete the task
// Save the tasks to localStorage
// Render the tasks 
    if(event.target.classList.contains("delete-button")){
        const deleteParentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = deleteParentTask.dataset.taskId;
        taskManager.deleteTask(taskId);
        taskManager.save();
        taskManager.render();
    }
//Edit buton 
//To find the parent container of edit button(conatin class "edit-button")
    if(event.target.classList.contains("edit-button")){
        const editParentTask = event.target.parentElement.parentElement.parentElement;
        const taskId = editParentTask.dataset.taskId;
// get the task from task manager
        const task = taskManager.getTaskById(taskId);
//to set the current submitted value in task modal to = new value on Edit modal
        editTaskId = task.id
        editTaskName.value = task.name
        editDescription.value = task.description
        editAssigned.value = task.assignedTo
        editDueDate.value = task.dueDate
        editStatus.value = task.status  
         
    }
});
// Make global scope of target element through DOM
const editTaskName = document.querySelector('#editTaskNameInput');
const editDescription = document.querySelector('#editDescription');
const editAssigned = document.querySelector('#editAssigned');
const editDueDate = document.querySelector('#editDueDate');
const editStatus = document.querySelector('#editStatus');
    
// Edit function with form validation
// similar logic with "Add New Task" form validation
let editTaskId;
function edit() {
    if (editTaskName.value.length < 5 || editDescription.value.length < 5 || editAssigned.value.length < 5
        || editDueDate.value.length === 0 || editStatus.value.length === 0 )
    {
        alert("Invalid Input!(all field needs to be more than 5 characters)");
    } else {
        taskManager.editTask(editTaskId, editTaskName.value, editDescription.value, editAssigned.value, editDueDate.value, editStatus.value)
        alert('Your form is edited');
        document.querySelector("form").reset();
        taskManager.save();
        taskManager.render();
        //the below jquery will hide the modal after submit the edit form
        $("#EditTask").modal("hide");
    }
}
//eventListener when submit button in the Edit modal is clicked
let editSubmit = document.getElementById('editSubmit');
editSubmit.addEventListener("click", edit) 

 

  

