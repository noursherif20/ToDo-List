

let btn = document.querySelector(".btn");
let input = document.querySelector(".input");
let contentDiv = document.querySelector(".content");

let myArray = [];

if (localStorage.getItem("tasks")){
myArray= JSON.parse(localStorage.getItem("tasks"));

}

getFromLocalStorage()
// adding task

btn.onclick= ()=> {
    if(input.value !== ""){
        addTask(input.value);
        input.value = "";
    }
}

// delete tab 

contentDiv.addEventListener("click",(e)=> {
    // remove task
    if(e.target.classList.contains("delete-btn")){
        deleteTaskWithId(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove();    
    }

    // task done
    if(e.target.classList.contains("task")){

        toggleStatusTaskWithId(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")


    }


})

function addTask(textValue) {
    const task = {
        id : Date.now(),
        title : textValue ,
        completed: false ,
    };

    myArray.push(task);

    // adding task to page
    addTaskToPage(myArray);

    // adding to localStorage
    addToLocalStorage(myArray);
}


function addTaskToPage(myArray){
    contentDiv.innerHTML ="";

    myArray.forEach((task)=>{
    // creating task div
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    // completed?
    if (task.completed){
        taskDiv.className="task done";

    }
    taskDiv.setAttribute("data-id",task.id);
    taskDiv.prepend(task.title);
    // creating deleteTab
    let deleteTab = document.createElement("button");
    deleteTab.classList.add("delete-btn"); 
    deleteTab.innerHTML = "X";
    taskDiv.append(deleteTab);
    // append to main div
    contentDiv.append(taskDiv);

    })
}







// adding to localStorage
function addToLocalStorage(myArray){
    window.localStorage.setItem("tasks", JSON.stringify(myArray));
}

// // getting from localStorage
function getFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addTaskToPage(tasks)
    }
}


function deleteTaskWithId(taskId){

    myArray =myArray.filter((task)=> task.id != taskId);
        addToLocalStorage(myArray);

}


function toggleStatusTaskWithId(taskId){

    for(let i = 0; i < myArray.length; i++){
        if(myArray[i].id == taskId){
            myArray[i].completed==false ? (myArray[i].completed= true) : (myArray[i].completed=false);

        }
    }
    addToLocalStorage(myArray)
}


let clear = document.getElementById("clear");

clear.onclick=function (){
    contentDiv.innerHTML = "";
    window.localStorage.removeItem("tasks")
    myArray = [];
}