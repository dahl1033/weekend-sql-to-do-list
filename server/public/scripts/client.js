console.log('js active');

$(document).ready(onReady);

function onReady(){
    getTodo();
    console.log('jquery active');
    $('#submitBtn').on('click', submitTodoObject);
    $('#noteContainer').on('click', '.deleteBtn', deleteTodo);
    $('#noteContainer').on('click', '.stickyNote', isDoneCheck);
    $('#noteContainer').on('click', '.stickyNote', changeColor);
}

function getTodo(){
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function (response){
        appendToDom(response);
    }).catch(function(error){
        console.log(error);
    });
}

function appendToDom(array){
    $('#noteContainer').empty();
    console.log('array', array);
    for(let i=0; i < array.length; i++){
        let id = array[i].id;
        let contributor = array[i].contributor_name;
        let schedule = array[i].schedule;
        let task = array[i].task;
        let dateAssigned = array[i].date_assigned;
        let dateDue = array[i].finish_date;
        let notes = array[i].notes;
        
        console.log('this is the id in client', id);
        $('#noteContainer').append(`
            <div class="stickyNote" data-schedule="${schedule}" data-done="${array[i].done}" data-id="${id}">
            <ul>
                <li>
                    <a href="#">
                        <h2 class="contributor"> ${contributor}</h2>
                        <p class="taskInfo">Task: ${task}</p>
                        <p class="taskNotes">Notes: ${notes}</p>
                        <td><button class="deleteBtn">Delete</button></td>
                </li>
            </ul>
        </div>
        `);
    }
}


function submitTodoObject(){
    let contributor = $('#contributor').val();
    let schedule = $('#schedule').val();
    let task = $('#task').val();
    let dateAssigned = $('#dateAssigned').val();
    let dateDue = $('#dateDue').val();
    let notes = $('#notes').val();
    $.ajax({
        method: 'POST',
        url:`/todo`,
        data: {contributor: contributor,
                schedule: schedule,
                task: task,
                dateAssigned: dateAssigned,
                dateDue: dateDue,
                notes: notes
            }
    }).then(function(response){
        console.log(response);
        getTodo();
    }).catch(function(error){
        console.log(error);
    });
}

function deleteTodo(){
    let todoId = $(this).closest('div').data('id');
    console.log('todo is here' , todoId);

    $.ajax({
        method: 'DELETE',
        url:`/todo/${todoId}`
    }).then(function(response){
        console.log(response);
        getTodo();
    }).catch(function(error){
        console.log(error);
    });
}

function isDoneCheck() {
    let todoId = $(this).closest('div').data('id');
    let isDone = $(this).closest('div').data('done');
    $.ajax({
        method: 'PUT',
        url: `/todo/done/${todoId}`,
        data: {done: isDone}
    }).then( (response) => {
        console.log('response from PUT request', response);
        getTodo();
    }).catch( (error) => {
        console.log('error from PUT request', error);
    }); // end isDoneCheck
}

function changeColor() {
    console.log('in change color', $(this));
    if ($(this).children().hasClass("active") === true) {
            $(this).children().removeClass("active");
    }
    else {
        $(this).children().addClass("active");
    }
}