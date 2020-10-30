const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "todos" ORDER BY "completed_status", "id";`
    ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log('error GET router', error);
        res.sendStatus(500);
    });
});


router.post('/', (req, res) => {
    pool.query(`INSERT INTO "todos" ("task") VALUES ($1);`, [
        req.body.task               // $1
    ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error POST router', error);
        res.sendStatus(500);
    });
});


router.delete('/:idParam', (req, res) => {
    pool.query(`DELETE FROM "todos" WHERE "id" = $1`, [
        req.params.idParam          //$1
    ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error DELETE router', error);
        res.sendStatus(500);
    });
});


router.put('/completed/:id', (req, res) => {
    pool.query(`UPDATE "todos" SET "completed_status" = $1 WHERE "id" = $2;`, [
        req.body.completedStatus,   // $1
        req.params.id               // $2
    ]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error PUT router', error);
        res.sendStatus(500);
    });
});


module.exports = router;