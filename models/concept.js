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

var Concept = module.exports = mongoose.model('s20160901',conceptSchema);

// Get Concepts

module.exports.getConcepts=function(callback,limit){
Concept.find(callback).limit(300);

};

//Get Concept
module.exports.getConceptById = function(conceptId,callback){
Concept.find({referencedComponentId:conceptId},callback);

};

//Get Icd9 codes
module.exports.getIcd9codes = function(code,callback){
Concept.find({icd9:code},callback);
}

//Get Icd10 codes
module.exports.getIcd10codes = function(code,callback){
Concept.find({mapTarget:code},callback);
}

//Get Description
module.exports.getDescription = function(term,callback){
console.log(term);
Concept.find( { sctName: { "$regex": term, "$options": "i" } },callback);

}

//Get Icd9 names
module.exports.getIcd9Names = function(term,callback){
Concept.find({ icd9_name: { "$regex": term, "$options": "i"}},callback);
}

//Get Icd10 names
module.exports.getIcd10Names = function(term,callback){
  Concept.find({ icdName: { "$regex": term, "$options": "i"}},callback);
  }

//Get the Stats
module.exports.getStatsSct = function(searchterm,callback){
  
  Concept.find({ sctName: { "$regex": searchterm, "$options": "i" } })
  .distinct('sctName')
  .exec(callback);
  
  
}

module.exports.getStatsIcd9 = function(searchterm,callback){
  
  
  Concept.find({ icd9_name: { "$regex": searchterm, "$options": "i" } })
  .distinct('icd9_name')
  .exec(callback);
  
  
}

module.exports.getStatsIcd10 = function(searchterm,callback){
  
  
  Concept.find({ icdName: { "$regex": searchterm, "$options": "i" } })
  .distinct('icdName')
  .exec(callback);
  
  
}