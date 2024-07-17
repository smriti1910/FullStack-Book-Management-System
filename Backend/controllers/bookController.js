const {request, response} = require('express')
const bookData = require('../data/bookData')
const bookModel = require('../models/bookModel')

const getAllBookData = async(request, response) => {
    try{
        let books = await bookModel.find();
        if(books.length === 0)
        {
            const initialBooks = await bookModel.insertMany(bookData);
            books = await bookModel.find();
        }
        response.status(200).json(books);
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const getBookDataByIsbn = async (request, response) => {
    const ISBNtoFetch = request.params.isbn;
    try{
        let books = await bookModel.find();
        if(books.length === 0)
        {
            const initialBooks = await bookModel.insertMany(bookData);
            books = await bookModel.find();
        }
        const expectedBookData = await bookModel.findOne({isbn: ISBNtoFetch})
        if(expectedBookData)
        {
            return response.status(200).json(expectedBookData);
        }
        return response.status(404).json({message: `No book was found with ISBN ${ISBNtoFetch}`})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const addNewBookData = async(request, response) => {
    const newBook = request.body
    try{
        const existingBook = await bookModel.findOne({isbn: newBook.isbn})
        if(existingBook)
        {
            return response.status(409).json({message: `A book with ${newBook.isbn} already exists`})
        }
        const insertedBook = await bookModel.create(newBook)
        response.status(201).json({message : "SUCCESSFULLY ADDED."})
    }
    catch(error)
    {
        response.status(500).json({message: error.message})
    }
}

const updateBookData = async (request, response) => {
    const bookTobeUpdated = request.body;
    try{
        const updatedBook = await bookModel.findOneAndUpdate({isbn : bookTobeUpdated.isbn}, bookTobeUpdated, { new : true});
        if(updatedBook) {
            return response.status(200).json({message: 'SUCCESSFULLY UPDATED.', updatedBook})
        }
        else {
            return response.status(404).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

const deleteBookData = async(request, response) => {
    const isbn = request.params.isbn;
    try{
        const deletedBook = await bookModel.findOneAndDelete({isbn : isbn});
        if(deletedBook) {
            return response.status(200).json({message: 'SUCCESSFULLY DELETED.'});
        }
        else {
            return response.status(400).json({message: 'Invalid ID'});
        }
    }
    catch(error)
    {
        return response.status(500).json({message: error.message});
    }
}

module.exports = {getAllBookData, getBookDataByIsbn, addNewBookData, updateBookData, deleteBookData};