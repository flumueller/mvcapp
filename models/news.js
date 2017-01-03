var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  created_at: {type: Date},
  updated_at: {type: Date}
});

schema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  
  if(!this.created_at) {
    this.created_at = now;
  }
  
  next();
});

schema.pre('update', function(next) {
  this.update({}, { 
    $set: { 
      updated_at: new Date() 
    } 
  });
  
  next();
});

module.exports = mongoose.model('News', schema);