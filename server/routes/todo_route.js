const { resolveNaptr } = require('dns');
const express = require ('express');
const router = express.Router();
const pool = require('../modules/pool');

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


router.post('/', (req, res) => {
    console.log('in post, req.body',req.body);
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
    let todoId = req.params.id;
    let queryText = `DELETE FROM "todo" WHERE "id" = $1;`;
    pool.query(queryText, [todoId]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
}); // end DELETE router

module.exports = router;