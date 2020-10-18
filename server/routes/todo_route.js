const { resolveNaptr } = require('dns');
const express = require ('express');
const router = express.Router();
const pool = require('../modules/pool');
// GET router that grabs data from sql data base
router.get('/', (req, res) => {
    console.log('in get');
    let queryText = `SELECT * FROM "todo" ORDER BY "id";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error in get', error);
        res.sendStatus(500);
    })
}); // end GET router

// POST route that adds new data to the sql data base
router.post('/', (req, res) => {
    console.log('in post, req.body',req.body); 
    // local variable decloration 
    let contributor = req.body.contributor;
    let schedule = req.body.schedule;
    let task = req.body.task;
    let dateAssigned = req.body.dateAssigned;
    let dateDue = req.body.dateDue;
    let notes = req.body.notes;

    let queryText = `INSERT INTO todo ("contributor_name", "schedule", "task", "date_assigned", "finish_date", "notes") 
	VALUES ('${contributor}', '${schedule}', '${task}', '${dateAssigned}', '${dateDue}', '${notes}');`;

    pool.query(queryText).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
}); //  end POST router

router.delete('/:id', (req, res) => {
    // local variable decloration 
    let todoId = req.params.id;

    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [todoId]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in delete router', error);
        res.sendStatus(500);
    });
}); // end DELETE router

// PUT router that updates the data base wheter a task has been completed or not 
router.put('/done/:id', (req, res)=>{
    console.log(`isDone PUT router active`);
    // local variable decloration 
    let queryText = '';
    let id = req.params.id;
    let isDone = req.body.done;
    console.log(`BEFORE id: ${id} isDone: ${isDone}`);
    
    if (isDone === 'false') {
        queryText = `UPDATE "todo" SET "done" = 'true' WHERE "id" = $1;`
    } else if (isDone === 'true') {
        queryText = `UPDATE "todo" SET "done" = 'false' WHERE "id" = $1;`
    }
    pool.query(queryText, [id]).then((result)=>{
        console.log('result from PUT', result.command);
        res.sendStatus(200);
    }).catch((error)=>{
        console.log('error from PUT', error);
        res.sendStatus(500)
    });
}); // end PUT router

module.exports = router;