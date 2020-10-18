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


// router.post('/', (req, res) => {
//     console.log(req.body);
//     let name = req.body.name;
//     let queryText = `INSERT INTO "todo" ("name") VALUES ($1, $2);`;

//     pool.query(queryText, [name]).then((result) => {
//         console.log(result);
//         res.sendStatus(200);
//     }).catch((error) => {
//         console.log('error in post', error);
//         res.sendStatus(500);
//     });
// }); //  end POST router
module.exports = router;