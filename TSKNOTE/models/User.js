const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required :true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true  
    },
    anagrafica :{
      CF:{
        type: String,
        required :false
      },
      cartaDiIdentita:{
        type: String,
        required :false,
        default: '-'
      },
      dataNascita:{
        type: Date,
        required :false,
      },
      luogoNascita:{
        type: String,
        required :false,
        default: '-'
      }  
    },
    role : {
      type: String,
      enum: ["user", "admin","staff"],
      required: [true, "Please specify user role"],
      default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user',UserSchema);