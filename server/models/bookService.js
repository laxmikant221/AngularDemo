var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  serviceId: {type:String, require:true},
  customerName: {type:String, require:true},
  mobileNumber: {type:String, require:true},
  address: {type:String, require:true},
  pinCode: {type: Object, require:true},
  email:{type:String, require:true},
  creationDate:{type:Date, require:true}
});

module.exports = mongoose.model('BookServices',schema);