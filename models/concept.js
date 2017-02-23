var mongoose = require('mongoose');

// concept Schema

var conceptSchema = mongoose.Schema({
id: {
      type: String
    },
    effectiveTime: {
      type: String
    },
    active: {
      type: String
    },
    moduleId: {
      type: String
    },
    refSetId: {
      type: String
    },
    referencedComponentId: {
      type: String
    },
    sctName: {
      type: String
    },
    mapGroup: {
      type: String
    },
    mapPriority: {
      type: String
    },
    mapRule: {
      type: String
    },
    mapAdvice: {
      type: String
    },
    mapTarget: {
      type: String
    },
    icdName: {
      type: String
    },
    mapCategoryId: {
      type: String
    },
    mapCategoryValue: {
      type: String
    },
    createdOn:{
    	type: Date,
    	default: Date.now

    }
  
  

});

var Concept = module.exports = mongoose.model('v20160901',conceptSchema);

// Get Concepts

module.exports.getConcepts=function(callback,limit){
Concept.find(callback).limit(5);

};

//Get Concept
module.exports.getConceptById =function(conceptId,callback){
Concept.find({referencedComponentId:conceptId},callback);

};

//Get Description
module.exports.getDescription = function(term,callback){
console.log(term);
Concept.find( { sctName: { "$regex": term, "$options": "i" } },callback).limit(50);

}