const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')

const router  =new express.Router()

router.get('/friends',auth,async (req,res)=>{
    res.status(201).send(req.user.friends)
})

router.post('/register',async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token =await  user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
    
})

router.post('/login',async (req,res)=>{
    try{ 
        const user = await User.findUser(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch(e){
        res.status(409).json({msg:e.message})
        console.log(e.message)
    }
    
})

router.post('/logout',auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send
    }
})

router.post('/friends',auth, async (req,res)=>{
    try {
        if(req.body.friend===req.user.email){
            throw new Error("you cant add yourself")
        }
        if(req.user.friends.includes(req.body.friend)){
            throw new Error("you cant add yourself")
        }
        const friend  = await User.findFriend(req.body.friend)
        req.user.friends = req.user.friends.concat(friend)
        await req.user.save()
        res.send(req.user.friends)
    } catch (e) {
        res.status(500).send("there is no user by that mail")
    }
})

router.patch('update',auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username','email','password']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try {
        updates.forEach(update=>req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('delete',auth, async(req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router
