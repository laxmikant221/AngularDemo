var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  serviceId: {type:String, require:true},
  customerName: {type:String, require:true},
  mobileNumber: {type:String, require:true},
  address: {type:String, require:true},
  pinCode: {type: String, require:true},
  timeSlot: {type: String, require:true},
  email:{type:String, require:true},
  creation_dt:{type:Date, require:true},
});

module.exports = mongoose.model('BookServices',schema);