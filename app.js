//querySelectors
const todoInput=document.querySelector('.todo-input');
const todoSubmit=document.querySelector('.todo-submit');
const todoList=document.querySelector('.todo-container');
const filterDiv=document.querySelector('.filter');
const filter=document.querySelector('.filter-todo');
//addEventListener
document.addEventListener("DOMContentLoaded", displayLocal);
todoSubmit.addEventListener('click',addTodo);
todoList.addEventListener('click',update);
filter.addEventListener('click',filterFun);
//functions

function filterFun(event){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case 'all': todo.style.display='flex';
                break;
            case 'complete': 
                if(todo.classList.contains('complete'))
                {
                    todo.style.display='flex';
                }else{
                    todo.style.display='none';
                }
                break;
            case 'incomplete':
                if(todo.classList.contains('complete'))
                {
                    todo.style.display='none';
                }else{
                    todo.style.display='flex';
                }
                break;
        }
    });
}

function update(event){
    const item=event.target;
    if(item.classList[0]==='todo-remove')
    {
        const todo=item.parentElement;
        todo.classList.add('deletion');
        setTimeout(()=>{
            todo.remove();
        },500);
        removeLocal(todo);
        console.log(todoList.childNodes.length);
        if(!(todoList.childNodes.length-1))
        {
            filterDiv.classList.add('hidden'); 
        }
    }
    else if(item.classList[0]==='todo-check')
    {
        const todo=item.parentElement;
        todo.classList.toggle('complete');
    }
}

function addTodo(event){
    event.preventDefault();
    if(!todoInput.value)
    {
        alert('Enter Something');
        return;
    }
    //todo Item
    const todoItem=document.createElement('div');
    todoItem.classList.add('todo-item');
    //todo li
    const todoLI=document.createElement('li');
    todoLI.classList.add('todo');
    todoLI.innerText=todoInput.value;
    saveLocal(todoInput.value);
    todoInput.value='';
    todoItem.appendChild(todoLI);
    //todo checkbutton
    const todoCheck=document.createElement('button');
    todoCheck.classList.add('todo-check');
    todoCheck.innerHTML=`<i class='fa fa-check'></i>`;
    todoItem.appendChild(todoCheck);
    //todo removebutton
    const todoRemove=document.createElement('button');
    todoRemove.classList.add('todo-remove');
    todoRemove.innerHTML=`<i class='fa fa-trash'></i>`;
    todoItem.appendChild(todoRemove);

    todoList.appendChild(todoItem);
    filterDiv.classList.remove('hidden');
}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function displayLocal(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoItem=document.createElement('div');
        todoItem.classList.add('todo-item');
        //todo li
        const todoLI=document.createElement('li');
        todoLI.classList.add('todo');
        todoLI.innerText=todo;
        todoItem.appendChild(todoLI);
        //todo checkbutton
        const todoCheck=document.createElement('button');
        todoCheck.classList.add('todo-check');
        todoCheck.innerHTML=`<i class='fa fa-check'></i>`;
        todoItem.appendChild(todoCheck);
        //todo removebutton
        const todoRemove=document.createElement('button');
        todoRemove.classList.add('todo-remove');
        todoRemove.innerHTML=`<i class='fa fa-trash'></i>`;
        todoItem.appendChild(todoRemove);

        todoList.appendChild(todoItem);
        filterDiv.classList.remove('hidden');
    })
}

function removeLocal(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }


// localStorage.clear();