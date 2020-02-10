const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    doneList = document.querySelector(".js-finishedList");

const TODOS_LS = 'toDos',
    FIN_LS = "done";

let toDos = []
    done = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    console.log(toDos);
    saveTodos();
}

function deleteFin(event){
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanToDos = done.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    done = cleanToDos;
    console.log(done);
    saveDone();
}

function checkToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    paintCheck(li.querySelector("span").textContent);
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    console.log(toDos);
    saveToDos();
}

function saveDone(){
    localStorage.setItem(FIN_LS, JSON.stringify(done));
}

function rewindToDo(event){
   const btn = event.target;
   const li = btn.parentNode;
   paintToDo(li.querySelector("span").textContent);
   doneList.removeChild(li);
   const cleanToDos = done.filter(function(toDo){
        return toDo.id !==parseInt(li.id);
    }); 
    done = cleanToDos;
    console.log(done);
    saveDone();
}


function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintCheck(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const rewindBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = done.length + 1;
    delBtn.style.border= '0px';
    delBtn.style.borderRadius = '15px';
    delBtn.style.marginLeft ='6px';
    delBtn.style.opacity = '0.8';
    rewindBtn.style.border= '0px';
    rewindBtn.style.borderRadius = '15px';
    rewindBtn.style.marginLeft ='6px';
    rewindBtn.style.width ='29px';
    rewindBtn.style.opacity = '0.8';
    rewindBtn.innerText = "🡸";
    rewindBtn.addEventListener("click", rewindToDo);
    delBtn.innerText ="❌";
    delBtn.addEventListener("click", deleteFin);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(rewindBtn);
    li.appendChild(delBtn);
    li.id = newId;
    doneList.appendChild(li);
    const doneObj = {
        text: text,
        id: newId
    }
    done.push(doneObj);
    saveDone();
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const checkBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.style.border= '0px';
    delBtn.style.borderRadius = '15px';
    delBtn.style.marginLeft ='6px';
    delBtn.style.opacity = '0.8';
    checkBtn.style.border= '0px';
    checkBtn.style.borderRadius = '15px';
    checkBtn.style.marginLeft ='6px';
    checkBtn.style.opacity = '0.8';
    checkBtn.innerText = "✔️";
    checkBtn.addEventListener("click", checkToDo);
    li.style.marginBottom ='10px';
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(checkBtn);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveTodos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();