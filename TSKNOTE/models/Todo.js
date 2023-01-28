const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    note:{
      type:String,
      required :true
   },
    desc:{
      title: {
         type: String,
         required :true,
         default:''
        },
      descrizione: {
         type: String,
         required :true,
         default:''
        },
    },
    status:{
      active: {
        type: Boolean,
        required :true,
        default:true
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
        },
      categorie : [{
        cat: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'cattodo',
          required :false,
        }
      }
      ]
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = Todo = mongoose.model('todo',TodoSchema);