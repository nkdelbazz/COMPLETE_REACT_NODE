const mongoose = require('mongoose');

const CatTodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    desc:{
         type: String,
         required :false,
         default:''
    },
    status:{
      active: {
        type: Boolean,
        required :true,
        default:true
      },
      user_create: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        },
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = Todo = mongoose.model('cattodo',CatTodoSchema);