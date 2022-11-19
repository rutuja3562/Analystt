const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    todo: { type: String, required: true ,unique:true},
   status: { type: Boolean,default:false },
      },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("todo", todosSchema);
// brand:{type:String, required:true},
