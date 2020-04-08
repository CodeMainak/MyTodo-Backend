const Note = require('../models/note.model.js');
// Create and Save a new Note
exports.create = (req, res) => {
    //validate request
    if(!req.body.content){
        return res.status(400).send({
            message:"Message Body should be defined"
        })
    }
    //create note
    const  note=new Note({
        content:req.body.content,
        flag:req.body.flag
    })
    //save note
    note.save().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.status(500).send({
            message:err.message||"There are some error occured"
        })
    })
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find().then((notes)=>{
        res.send(notes)
    }).catch((err)=>{8
        res.status(500).send({
            message:err.message||"Some error occur while retriving note"
        })
    })

};
// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then((note)=>{
        if(!note){
            return res.status(404).send({
                message:"Not found the note with the id"+req.params.noteId
            })
        }
        res.send(note);
    }).catch(err=>{
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.noteId
        });
    })
};

// Update a note identified by the noteId in the request
exports.update1 = (req, res) => {
    //validate request
    if(!req.body.content){
        return res.status(400).send({
            message:"Note content should not be empty"
        })
    }
    //find note and update it with request body
    Note.findByIdAndUpdate(req.params.noteId,{
        content:req.body.content,
        flag:req.body.flag
    },{new:true})
    .then(note=>{
        if(!note){
            return res.status(404).send({
                message:"Note not found with this id"+req.params.noteId
            })
        }
        Note.find().then((notes)=>{
            res.send(notes)})
        
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message:"Note not found with ID"+req.params.noteId
            })
        }
        return res.status(500).send({
            message:"Error Updating note with id"+req.params.noteId
        })
    })
};
//Update a note identified by the flag in the request
exports.update = (req, res) => {
    //find note and update it with request body
    Note.findByIdAndUpdate(req.params.noteId,{
        flag:req.body.flag
    },{new:true})
    .then(note=>{
        Note.find().then((notes)=>{
            res.send(notes)})
        
    }).catch(err=>{
        if(err.kind==='ObjectId'){
            return res.status(404).send({
                message:"Note not found with ID"+req.params.noteId
            })
        }
        return res.status(500).send({
            message:"Error Updating note with id"+req.params.noteId
        })
    })
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note=>{
        if(!note){
            return res.status(400).send({
                message:"Note not found with the Id"+req.params.noteId
            })
        }
        res.send({
            message:"Note has deleted successfully"
        })
    }).catch(err=>{
        if(err.kind==="ObjectId"||err.name==="NotFound"){
            return res.status(404).send({
                message:"Not found with id"+req.params.noteId
            })
        }
        return res.status(500).send({
            message:"Cannot delete note with this id"+noteId
        })
    })
};