console.log('Hello from js');

$(document).ready(onReady);

function onReady() {
    getTodos();
    $('#submit').on('click', addTodo); 
    $('#displayTasks').on('click', '.delete', deleteBtn);
    $('#displayTasks').on('click', '.complete', completeBtn)
}

function getTodos(){
    $.ajax({
        method: 'GET',
        url: '/todo'                // ajax GET to get data from database from todo route
    }).then(function(response) {
        appendToDom(response);
    }).catch(function(error){
        console.log(error);    
    });
}

function appendToDom(array){
    $('#displayTasks').empty();
    for (let i = 0; i < array.length; i++) {
        if(array[i].completed_status === true){
        $('#displayTasks').append(`
            <li class="taskItem completedItem shadow p-3 mb-5 bg-secondary rounded" data-id=${array[i].id} data-status= ${array[i].completed_status}>
                <p class="task"><del>${array[i].task}</del></p>
                <button class="complete btn btn-success">Undo Completed Task</button>
                <button class="delete btn btn-danger">Remove</button>
            </li>
        `)}
        else{
            $('#displayTasks').append(`
                <li class="taskItem shadow p-3 mb-5 bg-white rounded" data-id=${array[i].id} data-status= ${array[i].completed_status}>
                    <p class="task">${array[i].task}</p>
                    <button class="complete btn btn-success">Complete Task</button>
                    <button class="delete btn btn-danger">Remove</button>
                </li>
            
        `)}
    }
}

function addTodo(){
    if($('#newTodo').val() === ''){
        return alert('ERROR: Input a task in the field')
    } else {
    
        let newTodo = {
            task: $('#newTodo').val()   // grabs newTodo value from user input
        }
        $.ajax({
            method: 'POST',
            url: '/todo',               // ajax POST to send new todo input to todo_route
            data: newTodo
        }).then(function (response) {
            $('#newTodo').val('');
            console.log('Response:', response);
            getTodos();
        });

    }
}

function deleteBtn(){
    $.ajax({
        method: 'DELETE',
        url: `/todo/${$(this).closest('li').data('id')}` // grabs the li data-id 
    }).then(function(response) {
        console.log('Delete Btn response:', response);
        getTodos();
    }).catch(function(error){
        console.log('ERROR in deleteBtn:', error);
    });
}

function completeBtn(){
    $.ajax({
        method: 'PUT',
        url: `/todo/completed/${$(this).closest('li').data('id')}`,     // grabs the li data-id 
        data: {completedStatus: !$(this).closest('li').data('status')}  // grabs the li data-status 
    }).then(function(response){ 
        getTodos();
    }).catch(function(error){
        console.log('ERROR in ajax PUT:', error);
    });
    
}




// if(array[i].completed_status === true){
//             $('#listTable').append(`
//                 <tr data-id=${array[i].id}>
//                     <td class="strikeThrough taskName completed">
//                         <span class="checkMark"><i class="fas fa-check checkMark"></i></span>
//                         ${array[i].task}
//                     </td>
//                     <td class="completed">Task Completed!</td>
//                     <td class="completed"><button class="delete btn btn-danger">Remove</button></td>
//                 </tr>
//             `)            
//         } else {
//             $('#listTable').append(`
//             <tr data-id=${array[i].id}>
//                 <td class="taskName">${array[i].task}</td>
//                 <td><button class="complete btn btn-success">Complete Task</button></td>
//                 <td><button class="delete btn btn-danger">Remove</button></td>
//             </tr>
//         `)  
//         }