var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new Schema({
  customerEmail: {type:String, require:true},
  serviceId: {type:ObjectId, require:true},
  serviceName: { type:String, require:true},
  customerName: {type:String, require:true},
  message: {type:String, require:true},
  creation_dt: {type:Date, require:true},
});

module.exports = mongoose.model('Notifications',schema);