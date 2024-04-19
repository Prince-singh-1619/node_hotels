const express = require('express')
const router = express.Router()
const Person = require('../models/person')

//POST route to add a person
router.post('/', async (req, res) =>{
    try {
        const data = req.body   //assuming the request body conatins the person data 

        //create a new person document using the mongoose model 
        const newPerson = new Person(data)

        //save the new person to the database
        const response = await newPerson.save() 
        console.log('Data saved successfully');
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internl server error'})
    }
})

//GET method to get the person
router.get('/', async(req, res) =>{
    try {
        const data = await Person.find()
        console.log('Data fetched successfully')
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }   
})

//method to get data for specified work 
router.get('/:workType', async(req, res) =>{
    try {
        const workType = req.params.workType    //extact the work type from the URL parameter
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const response = await Person.find({work: workType})
            console.log('Data fetched successfully')
            res.status(200).json(response)
        }else{
            res.status(404).json({error: 'Invalid work type'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

//PUT method to update the existing data in DB
router.put('/:id', async(req, res) =>{
    try {
        const personId = req.params.id  //extract the id from URL parameter
        const updatedPersonData = req.body  //updated data for the person
        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,      //returns the updated document
            runValidators: true,     //runs Mongoose validation, means checks for all specified field in DB 
        })
        if(!response){      //if the id or person does not exist in DB
            res.status(404).json({error: 'Person not found'})
        }
        console.log('Data updated successfully')
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})     
    }
})

//DELETE method to delete data from DB
router.delete('/:id', async(req, res) =>{
    try {
        const personId = req.params.id
        const response = await Person.findByIdAndDelete(personId)
        if(!response){
            res.status(404).json({error: 'Person does not exist'})
        }
        else{
            console.log('Data deleted successfully')
            res.status(200).json({message: 'Person deleted successfuly'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router