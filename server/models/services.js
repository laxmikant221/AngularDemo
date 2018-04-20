var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  serviceName : {type:String, require:true},
  serviceCategory: {type:String, require:true},
  address: {type:String, require:true},
  description: {type:String, require:true},
  price: {type: Object, require:true},
  zipCode:{type:String, require:true},
  imageUrl:{type:String, require:true},
  creationDate:{type:Date, require:true},
  updationDate:{type:Date, require:true}
});

module.exports = mongoose.model('Service',schema);