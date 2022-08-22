const db = require('./db');
const router = require("express").Router();
const tableName = 'contactTbl';

//  http://localhost:8080/contact/get
router.get('/get', async (req, res) => {
    let [contacts, err] = await db.getTable(tableName);
    if (err)
        res.status(500).send({ ok: false, message: err.message })
    else res.status(200).send({ result: contacts });
})

//  http://localhost:8080/contact/getById?id=1
router.get('/getById', async (req, res) => {
    let { id } = req.query;
    let [contact, err] = await db.getById(tableName, id);
    if (err)
        res.status(500).send({ ok: false, message: err.message })
    res.status(200).send({ result: contact });
})

//  http://localhost:8080/contact/post
router.post('/post', async (req, res) => {
    let contact = req.body;
    let [insertId, err] = await db.insert(tableName, contact);
    if (err)
        res.status(500).send({ ok: false, message: err.message })
    res.status(200).send({ result: { insertId: insertId } });
})

//  http://localhost:8080/contact/put
router.put('/put', async (req, res) => {
    let contact = req.body;
    let [result, err] = await db.update(tableName, contact);
    if (err)
        res.status(500).send({ ok: false, message: err.message })
    res.status(200).send({ result: 'ok' });
})

//  http://localhost:8080/contact/delete?id=1
router.delete('/delete', async (req, res) => {
    let { id } = req.query;
    let [result, err] = await db.deleted(tableName, id);
    if (err)
        res.status(500).send({ ok: false, message: err.message })
    res.status(200).send({ result: 'ok' });
})



module.exports = router;