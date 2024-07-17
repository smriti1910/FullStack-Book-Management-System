const express = require('express')
const router = express.Router()

const {getAllBookData, getBookDataByIsbn, addNewBookData, updateBookData, deleteBookData} = require('../controllers/bookController')

router.get('/getAllBookData', getAllBookData);

router.get('/getBookDataByIsbn/:isbn', getBookDataByIsbn);

router.post('/addNewBookData', addNewBookData);

router.put('/updateBookData/', updateBookData);

router.delete('/deleteBookData/:isbn', deleteBookData);

module.exports = router