const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-form input");
const todoValue = document.querySelector("#todo-value");
const todoList = document.querySelector("#todo-list");
const clock = document.querySelector("h2.clock");
const day = document.querySelector("h1.day")
let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜

let nextId = 1;


// todo 객체
function Todo(title, detail, dueDate) {
    this.id = nextId++;
    this.title = title;
    this.detail = detail;
    this.dueDate = dueDate;

    this.update = function(newTitle, newDetail, newDueDate) {
        this.title = newTitle;
        this.detail = newDetail;
        this.dueDate = newDueDate;
    };
}

let storedTodoList = [];

function saveTodo() {
    localStorage.setItem("todoData", JSON.stringify(storedTodoList));
}


function cancelTodo(event) {
    const targetPlace = event.target.parentElement.parentElement;
    targetPlace.remove();
}

// todo 삭제
function deleteTodo(targetId){
    storedTodoList = storedTodoList.filter(todo => todo.id !== targetId);
    localStorage.setItem("todoData", JSON.stringify(storedTodoList));
    renderTodoList();
}

// todo 보기
function visionTodo(event){
    const eventTarget = event.target.parentElement;

    eventTarget.querySelector(".vision-button").classList.add("hidden");
    eventTarget.querySelector(".edit-button").classList.remove("hidden");
    eventTarget.querySelector(".delete-button").classList.remove("hidden");
    eventTarget.querySelector(".blind-button").classList.remove("hidden");
    eventTarget.querySelector("p").classList.remove("hidden");

}

// todo 간소화
function blindTodo(event){
    const eventTarget = event.target.parentElement;

    eventTarget.querySelector(".vision-button").classList.remove("hidden");
    eventTarget.querySelector(".edit-button").classList.add("hidden");
    eventTarget.querySelector(".delete-button").classList.add("hidden");
    eventTarget.querySelector(".blind-button").classList.add("hidden");
    eventTarget.querySelector("p").classList.add("hidden");

    
}

// updateTodo
function updateTodo(event){
    event.preventDefault();
    const targetTodoId = parseInt(event.target.dataset.id, 10);
    const targetTodo = storedTodoList.find(todo => todo.id === targetTodoId);
    
    if(targetTodo){
        const newTitle = event.target.querySelector(".edit-title-input").value;
        const newDetail = event.target.querySelector(".edit-detail-input").value;
        const newDueDate = event.target.querySelector(".edit-date-input").value;

        targetTodo.update(newTitle, newDetail, newDueDate);
        

        renderTodoList();

    }
}

// todo 수정
function showEditForm(todo){
    const targetTodoItem = document.querySelector(`.todo-item.todo-${todo.id}`);
    const editForm = document.createElement("form");
    editForm.className = "edit-form";
    editForm.dataset.id = todo.id;

    editForm.innerHTML = `
        <input type="text" class="edit-title-input" value="${todo.title}" required/>
        <input type="text" class="edit-detail-input" value="${todo.detail}" required/>
        <input type="date" class="edit-date-input" value="${todo.dueDate}" required/>
        <button type="submit">저장</button>
        <button type="button" class="cancel-edit">취소</button>
    `

    targetTodoItem.innerHTML = '';
    targetTodoItem.appendChild(editForm);

    editForm.querySelector(".cancel-edit").addEventListener("click", ()=> renderTodoList());
    editForm.addEventListener("submit", updateTodo);

}

function getClock() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerText = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}


// function cancelEdit(event) {
//     const targetPlace = event.target.parentElement;
//     const targetAll = targetPlace.parentElement.parentElement;

//     //수정 필요?
//     if (targetPlace.parentElement.className === "item-title") {
        
//         if ((targetAll.querySelector(".dirbutton") || targetAll.querySelector(".todo_contents .edit .cancel-button")) === null) {
            
//             const EButton = targetAll.querySelector(".edit-button");
//             const XButton = targetAll.querySelector(".delete-button");
//             EButton.classList.remove("hidden");
//             XButton.classList.remove("hidden");
//         }
//     } else if (targetPlace.parentElement.className === "todo_contents") {
        
//         if ((targetAll.querySelector(".titlebutton") || targetAll.querySelector(".item-title .edit .cancel-button")) === null) {
            
//             const EButton = targetAll.querySelector(".edit-button");
//             const XButton = targetAll.querySelector(".delete-button");
//             EButton.classList.remove("hidden");
//             XButton.classList.remove("hidden");
//         }
//     }

//     targetPlace.remove();
// }

// function editTodo(event) {
//     event.preventDefault()
//     const targetPlace = event.target.parentElement;

//     if (targetPlace.className === "item-title") {

//         //새 데이터 저장
//         const newTitle = event.target.querySelector(".edit-input").value;
        
//         //덮어씌우기
//         targetPlace.innerText = newTitle;

//         if ((targetPlace.parentElement.querySelector(".dirButton") || targetPlace.parentElement.querySelector(".todo_contents .edit")) === null) {
//             const EButton = targetPlace.parentElement.parentElement.querySelector(".edit-button");
//             const XButton = targetPlace.parentElement.parentElement.querySelector(".delete-button");
//             EButton.classList.remove("hidden");
//             XButton.classList.remove("hidden");
//         }

//     } else {
//         //새 데이터 저장
//         const newContents = event.target.querySelector(".edit-input").value;
        
//         //덮어씌우기
//         targetPlace.querySelector("span").innerText = newContents;

//         // form 삭제
//         targetPlace.querySelector(".edit").remove();

        
//         if ((targetPlace.parentElement.querySelector(".titleButton") || targetPlace.parentElement.querySelector(".item-title .edit")) === null) {
//             const EButton = targetPlace.parentElement.parentElement.querySelector(".edit-button");
//             const XButton = targetPlace.parentElement.parentElement.querySelector(".delete-button");
//             EButton.classList.remove("hidden");
//             XButton.classList.remove("hidden");
//         }

//     }

// }


// function newForm(event) {
//     const targetPlace = event.target.parentElement;

//     if (event.target.className === "titleButton") {
        
//         //입력 form, input
//         const editForm = document.createElement("form");
//         editForm.className = "edit";
//         const editInput = document.createElement("input");
//         editInput.className = "edit-input";
//         editInput.type = "text"
//         editForm.appendChild(editInput);
//         targetPlace.appendChild(editForm);

//         //버튼 제거
//         targetPlace.querySelector(".titleButton").remove();

//         //취소버튼
//         const cancelButton = document.createElement("button");
//         cancelButton.innerText = "취소";
//         cancelButton.className = "cancel-button";
//         cancelButton.type = "button";
//         targetPlace.querySelector(".edit").appendChild(cancelButton);

//         cancelButton.addEventListener("click", cancelEdit);

//         //이벤트
//         editForm.addEventListener("submit", editTodo);

//     } else {
        
//         //입력 form, input
//         const editForm = document.createElement("form");
//         editForm.className = "edit";
//         const editInput = document.createElement("input");
//         editInput.className = "edit-input";
//         editInput.type = "text"
//         editForm.appendChild(editInput);
//         targetPlace.appendChild(editForm);

//         //버튼 제거
//         targetPlace.querySelector(".dirButton").remove();

//         //취소버튼
//         const cancelButton = document.createElement("button");
//         cancelButton.innerText = "취소";
//         cancelButton.className = "cancel-button";
//         cancelButton.type = "button";
//         targetPlace.querySelector(".edit").appendChild(cancelButton);

//         cancelButton.addEventListener("click", cancelEdit);
        

//         //이벤트
//         editForm.addEventListener("submit", editTodo);
//     }


// }


// function changeButton(event) {
//     //버튼 숨기기
//     const targetPlace = event.target.parentElement.parentElement;
//     const EButton = targetPlace.querySelector(".edit-button");
//     const XButton = targetPlace.querySelector(".delete-button");
//     EButton.classList.add("hidden");
//     XButton.classList.add("hidden");

//     //수정 대상 지정 버튼
//     const titleButton = document.createElement("button");
//     titleButton.innerText = "제목 수정";
//     titleButton.className = "titleButton";
//     const dirButton = document.createElement("button");
//     dirButton.innerText = "내용 수정";
//     dirButton.className = "dirButton";
//     targetPlace.querySelector("h2").appendChild(titleButton);
//     targetPlace.querySelector("div").appendChild(dirButton);

//     titleButton.addEventListener("click", newForm);
//     dirButton.addEventListener("click", newForm);

// }

function renderTodoList() {
    todoList.innerHTML = "";

    storedTodoList.forEach(todo => {
        const todoItem = document.createElement("div");
        todoItem.className = `todo-item todo-${todo.id}`;
        todoItem.innerHTML = `
            <h3>${todo.title}</h3>
            <p>${todo.detail}</p>
            <p>${todo.dueDate}</p>
            <button class="edit-button">수정</button>
            <button class="delete-button">삭제</button>
            <button class="blind-button">접기</button>
            <button class="vision-button hidden">펼치기</button>

        `;
        const currentDate = new Date();
        const dueDate = new Date(todo.dueDate);
        const timeDif = dueDate - currentDate;
        const daysRemain = Math.ceil(timeDif / (1000 * 60 * 60 * 24));

        // 마감일 임박 2일
        if(daysRemain <= 2 && daysRemain >= 0){
            todoItem.style.backgroundColor = "tomato";
            todoItem.style.color = "white";
        }
        // 마감일 지난거 음수인 경우
        else if(daysRemain < 0) {
            todoItem.style.backgroundColor = "gray";
            todoItem.style.color = "white";
        }
        // 마감일 많이 남은거 

        // 삭제버튼
        todoItem.querySelector(".delete-button").addEventListener("click", () => {
            deleteTodo(todo.id);
        })

        // 수정버튼
        todoItem.querySelector(".edit-button").addEventListener("click", () => {
            showEditForm(todo);
        })

        //접기버튼
        todoItem.querySelector(".blind-button").addEventListener("click", blindTodo)
        
        //펼치기버튼
        todoItem.querySelector(".vision-button").addEventListener("click", visionTodo)


        todoList.appendChild(todoItem);
        saveTodo();
    })

}

function addTodo(event) {
    event.preventDefault();
    
    const todoItem = document.createElement("div");
    todoItem.className = "todo_direct"

    const h2 = document.querySelector(".item-title");

    const contents = document.createElement("div");
    contents.className = "todo_contents";

    const todoDetail = document.querySelector(".item-form span");
    // const todoContents = document.createElement("span");
    // todoContents.innerText = todoDetail.innerText;
    
    const dateValue = document.querySelector(".date-form input").value;

    const dateDiv = document.createElement("div");
    dateDiv.className = "date-todo"
    
    // const dateSpan = document.createElement("span");
    // dateSpan.innerText = "마감일 - " + dateValue;
    
    
    // const delButton = document.createElement("button");
    // delButton.innerText = "삭제";
    // delButton.className = "delete-button"
    // delButton.addEventListener("click", cancelTodo);

    // const editButton = document.createElement("button");
    // editButton.innerText = "수정";
    // editButton.className = "edit-button";
    // editButton.addEventListener("click", changeButton);


    // contents.appendChild(todoContents);
    // contents.appendChild(editButton);
    // contents.appendChild(delButton);
    // dateDiv.appendChild(dateSpan);

    
    // todoItem.appendChild(h2);
    // todoItem.appendChild(contents);
    // todoItem.appendChild(dateDiv);

    // 배열에 저장하기
    const newTodo = new Todo(h2.innerText, todoDetail.innerText, dateValue);
    storedTodoList.push(newTodo);

    // todoList.appendChild(todoItem);
    renderTodoList();
    document.querySelector(".item-form").remove();
}

function dateTodo(event) {
    event.preventDefault();

    const itemForm = document.querySelector(".item-form");

    // 등록된 item
    const todoValue = document.querySelector(".todo-value");
    const todoText = todoValue.value;
    todoValue.value = "";


    const todoDetail = document.createElement("span");
    todoDetail.innerText = todoText;

    //마감일 받기
    const dateForm = document.createElement("form");
    dateForm.className = "date-form";
    const dateInputField = document.createElement("input");
    dateInputField.className = "todo-date"
    dateInputField.type = 'date';

    const submitButton = document.createElement("button");
    submitButton.innerText = "확인";
    submitButton.type = "submit";


    dateForm.appendChild(dateInputField);
    dateForm.appendChild(submitButton);
    itemForm.appendChild(todoDetail);
    itemForm.appendChild(dateForm);

    document.querySelector(".value-form").remove();

    dateForm.addEventListener("submit", addTodo);




}



function newTitle(event) {
    event.preventDefault();
    const todoTitle = todoInput.value;
    todoInput.value = "";
    const itemForm = document.createElement("div");
    itemForm.className = "item-form"
    const itemTitle = document.createElement("h2");
    itemTitle.classList = "item-title";
    itemTitle.innerText = todoTitle;
    itemForm.appendChild(itemTitle);
    todoValue.appendChild(itemForm);

    const valueForm = document.createElement("form");
    valueForm.className = "value-form";
    itemForm.appendChild(valueForm);

    const inputField = document.createElement("input");
    inputField.className = "todo-value"
    inputField.type = 'text';
    inputField.placeholder = "내용을 입력해주세요";
    inputField.required = true;
    valueForm.appendChild(inputField);

    const XButton = document.createElement("button");
    XButton.type = "button";
    XButton.innerText = "취소";
    valueForm.appendChild(XButton);

    valueForm.addEventListener("submit", dateTodo);
    XButton.addEventListener("click", cancelTodo);
}


todoForm.addEventListener("submit", newTitle);

day.innerText = year + '/' + month + '/' + date;

getClock();

setInterval(getClock, 1000);

renderTodoList();

const saveTodos = localStorage.getItem("todoData");

if (saveTodos !== null) {
    const parsedTodos = JSON.parse(saveTodos);
    storedTodoList = parsedTodos;
    parsedTodos.forEach(renderTodoList);
}