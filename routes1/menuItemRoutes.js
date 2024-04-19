const express = require('express')
const router = express.Router()
const MenuItem = require('../models/menuItem')


//POST method to add a menu item 
router.post('/', async(req, res) =>{
    try {
        const data = req.body
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log('Data saved successfully')
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})   
    }
})

//GET method to get the menuItems
router.get('/', async(req, res) =>{
    try {
        const data = await MenuItem.find()
        console.log('Data fetched successfully')
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

//method to get specified data about taste
router.get('/:tasteType', async(req, res) =>{
    try {
        const tasteType = req.params.tasteType
        if(tasteType=='spicy' || tasteType=='sweet' || tasteType=='sour'){
            const response = await MenuItem.find({taste: tasteType})
            console.log('Data fetched successfully')
            res.status(200).json(response)
        }
        else{
            res.status(404).json({error: 'Invalid taste type'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Invalid server error'})
    }
})

router.put('/:id', async(req, res) =>{
    try {
        const menuId = req.params.id
        const updatedMenuData = req.body
        const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new: true,
            runValidators: true,
        })
        if(!response){
            res.status(404).json({error: 'Menu item not available'})
        }
        else{
            console.log('Data updated successfully')
            res.status(200).json(response)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

router.delete('/:id', async(req, res) =>{
    try {
        const menuId = req.params.id
        const response = await MenuItem.findByIdAndDelete(menuId)
        if(!response){
            res.status(404).json({error: 'Item not found'})
        }
        else{
            console.log('Item deleted successfully')
            res.status(200).json({message: 'Item deleted successfully'})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Internal server error'})
    }
})

module.exports = router