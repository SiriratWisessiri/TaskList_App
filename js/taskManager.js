
const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html =
  `<li class="listCard card" data-task-id='${id}'>
    <div class="card-body">
      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="${id}">
      <h5 class="card-title">${name}</h5>
      </button>

      <span class="badge badge-pill badge-secondary">${status}</span>

      <div class = "cardBtn">
        <!-- Button trigger Edit modal -->
        <button type="button" class="edit-button btn-sm material-icons" data-toggle="modal" data-target="#EditTask">edit</button> 
        <button type="button" class="delete-button  btn-sm material-icons">delete</button>
        <button type="button" class="done-button ${hide(status)} material-icons">done</button>
      </div>
    </div>

    <div class="collapse" id="${id}">
      <p class="card-text">Description: ${description}</p>
      <p class="card-text">Assigne to: ${assignedTo}</p>
      <p class="card-text">Due date: ${dueDate}</p>
      <p class="card-text"><b>Status: ${status}</b></p>
    </div>
  </li>`;
  return html;
};

// Take Manager class to add new task
class TaskManager {
  static count = 0
  constructor() {
      this.tasks = [];
      this.currentId = crypto.randomUUID();
      // TaskManager.count++
      // this.taskCreated = 0;
  }
  // Create the addTask method
  addTask(name, description, assignedTo, dueDate, status) {
      console.log(this.currentId)
      // const task = {
      // id: this.taskCreated,
      // name: name,
      // description: description,
      // assignedTo: assignedTo,
      // dueDate: dueDate,
      // status: status
      // };
      const task = new Task(name, description, assignedTo, dueDate, status);
      this.tasks.push(task);
      this.taskCreated++;
  }
  // Create render() method
  render(){
    const tasksHtmlList = [];
    for (let i = 0; i < this.tasks.length; i++){
      const task = this.tasks[i];
      const date = new Date(task.dueDate)
      const formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      const taskHtml = createTaskHtml (
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status,
      );
      tasksHtmlList.push(taskHtml);
    }
    const tasksHtml  = tasksHtmlList.join("\n");
  // Set the inner html of the tasksList on the page
  const tasksList = document.querySelector("#task-list");
  tasksList.innerHTML = tasksHtml;
  }

  // Task 8: Functional Done button. Method "Get Task By ID"
  getTaskById(taskId){
  let foundTask;
  for (let i = 0; i < this.tasks.length; i++) {
    const task = this.tasks[i];
    if(task.id === taskId){
      foundTask = task;
    }
  }
  return foundTask;
} 
  //Task 9 Store in local storage. Save method
  //1. In js/taskManager.js, in the TaskManager class, create a save method. This method doesn't require any parameters.
  //2. In the save method, create a JSON string of the tasks using JSON.stringify() and store it to a new variable, tasksJson
  //3. Store the JSON string in localStorage under the key tasks using localStorage.setItem()
  //4. Convert the this.currentId to a string and store it in a new variable, currentId
  //5. Store the currentId variable in localStorage under the key currentId using localStorage.setItem()
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem('tasks', tasksJson);
    const currentId = JSON.stringify(this.currentId);
    localStorage.setItem('currentId', currentId);
  }
  //Task 9 Store in local storage. Load method
  // 1.In js/taskManager.js, add a new method called load. This method doesn't require any parameters.
  // 2.In the load method, check if any tasks are saved in localStorage with localStorage.getItem().
  // 3.If any tasks are stored, get the JSON string of tasks stored in localStorage with localStorage.getItem(), making sure to pass the key we used to save the tasks, tasks. Store this string into a new variable, tasksJson.
  // 4.Convert the tasksJson string to an array using JSON.parse() and store it in this.tasks.
  // 5.Next, check if the currentId is saved in localStorage with localStorage.getItem().
  // 6.If the currentId is stored, get the currentId in localStorage using localStorage.getItem() and store it in a new variable, currentId.
  // 7.Convert the currentId to a number before storing it to the TaskManager's this.currentId
  // 8.In js/index.js, near the top of the file, after instantiating taskManager, load the tasks with taskManager.load() and render them with taskManager.render().
  load() {
      if (localStorage.getItem('tasks')) {
        const tasksJson = localStorage.getItem('tasks');
        this.tasks = JSON.parse(tasksJson);
      }
      if (localStorage.getItem(this.currentId)) {
        const currentId = localStorage.getItem('currentId');
        this.currentId = Number(currentId);
      }
    }

  //Delete method
  // 1.deleteTask method should take one parameter,the id of the task we want to delete.
  // 2.new variable with empty array(the empty array will receive the pushed task).
  // 3.Loop over the tasks, and for each iteration:
  //    -Get the current task in the loop, store it in a variable task.
  //    -Check if task.id is not equal to the taskId passed as a parameter.
  //    -If the task.id is not equal to the taskId, push the task into the newTasks array.
  // 4.Set this.tasks to newTasks.
  deleteTask(taskId){
    const newTasks =[];
    for(let i=0; i < this.tasks.length; i++){
      const task = this.tasks[i];
      if(task.id != taskId){
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;
  
  }

  //Edit Task method. Modify the existing task
  // editTask method with parameter that same with the task created.
  // compareing the task id to match the existing task and the editing task
  // assign the value of the existing task to the task that will be edited
  editTask(taskId, name, description, assignedTo, dueDate, status){
    let task = this.getTaskById(taskId);
    task.name = name
    task.description = description
    task.assignedTo = assignedTo
    task.dueDate = dueDate
    task.status = status
  }
} 

// separate the task from the "addTask" method to create another class.
// Change id to use crypto.randomUUID() to help create a random ID every time. Solved the problem of id restart from 0 once refresh the page. 
class Task {
  static count = 0
  constructor(name, description, assignedTo, dueDate, status){
      this.id = `taskId_${crypto.randomUUID()}`
      this.name = name
      this.description = description
      this.assignedTo = assignedTo
      this.dueDate = dueDate
      this.status = status
      //Task.count++
  }
}
//hide the 'Done' button once clicked
// if status is "Done" the button will be invisible
function hide(status){
  if(status === 'Done'){
    return 'invisible'
  }else{
    return 'visible'
  }
}