//select methods
function select(elements) {
    return document.querySelector(elements);
}
function selectAll(elements) {
    return document.querySelectorAll(elements);
}
function createElement(elements){
    return document.createElement(elements)
}
//selector
const totalTask = selectAll("#total-task")
const completeTask = select("#complete-task")
const secondTitle = select("#second-title")
const plural = select("#plural")
const textInput = select("#text-input")
const submit = select("#submit")
const filterOption = select("#filter")
const todoList = select("#todo-list")
const todoItems = todoList.children

//function 

function addTodo(e){
    e.preventDefault()
    if(textInput.value !== ""){
        //create elements
        const a = document.createElement("a")
        const todo = createElement("div")
        const p = createElement("p")
        const check = createElement("button")
        const trash = createElement("button")
        const iconCheck = createElement("i")
        const iconTrash = createElement("i")


        check.setAttribute("id","check")
        trash.setAttribute("id","trash")
        p.innerText = textInput.value
        iconCheck.classList.add("fas","fa-check")
        todo.classList.add("todo")
        iconTrash.classList.add("fas","fa-trash")
        
        check.appendChild(iconCheck)
        trash.appendChild(iconTrash)
        todo.appendChild(p)
        todo.appendChild(check)
        todo.appendChild(trash)
        todoList.appendChild(todo)
        textInput.value = ""
        
        //add a green backrounde on completed task
        function taskDone(){
            p.classList.toggle("done")
            
            const tasksDone = selectAll(".done") 
            if(tasksDone.length >= 0){
                completeTask.innerText = tasksDone.length

            }
        }
        check.addEventListener("click",taskDone)

        //delete task unwanted tasks
        function deleteTask(){
            
            todo.classList.add("fall")
            todo.addEventListener("transitionend",function(){
                todo.remove()
                const tasksDone = selectAll(".done") 
                completeTask.innerText = tasksDone.length
                for(let i=0; i < totalTask.length; i++){
                    totalTask[i].innerText = todoItems.length
                }
            })
        }
        trash.addEventListener("click",deleteTask)
        for(let i=0; i < totalTask.length; i++){
            totalTask[i].innerText = todoItems.length
        }
        
    }else{
        alert("Entrer a task todo to create it")
    }

}
function filterTodo(e){
    const todos = todoList.children
    console.log(todos)
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if(todo.firstElementChild.classList.contains("done")){
                    todo.style.display ="flex"
                }else{
                    todo.style.display = "none"
                }
             break
            case "uncompleted":
                if(!todo.firstElementChild.classList.contains("done")){
                    todo.style.display ="flex"
                }else{
                    todo.style.display = "none"
                }
            break
        }
        
    }
}
//events
submit.addEventListener("click",addTodo)
filterOption.addEventListener("click",filterTodo)