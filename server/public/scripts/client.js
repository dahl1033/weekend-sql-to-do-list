console.log('js active');

$(document).ready(onReady);

function onReady(){
    getTodo();
    console.log('jquery active');
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
    $('#todoTableBody').empty();
    console.log('array', array);
    for(let i=0; i < array.length; i++){
        let contributor = array[i].contributor_name;
        let schedule = array[i].schedule;
        let task = array[i].task;
        let dateAssigned = array[i].date_assigned;
        let dateDue = array[i].finish_date;
        let notes = array[i].notes;
        

        $('#todoTableBody').append(`
            <<tr>
                <td>${contributor}</td>
                <td>${schedule}</td>
                <td>${task}</td>
                <td>${dateAssigned}</td>
                <td>${dateDue}</td>
                <td>${notes}</td>
            </tr>
        `);
    }
}


// function submitTodoObject(){
//     let contributor = $('#contributor').val();
//     let schedule = $('#schedule').val();
//     let task = $('#task').val();
//     let dateAssigned = $('#dateAssigned').val();
//     let dateDue = $('#dateDue').val();
//     let notes = $('#notes').val();
//     $.ajax({
//         method: 'POST',
//         url:`/todo`,
//         data: {contributor: contributor,
//                 schedule: schedule,
//                 task: task,
//                 dateAssigned: dateAssigned,
//                 dateDue: dateDue,
//                 notes: notes
//             }
//     }).then(function(response){
//         console.log(response);
//         getFoods();
//     }).catch(function(error){
//         console.log(error);
//     });
// }