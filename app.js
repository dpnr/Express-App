var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

Concept = require('./models/concept');

//connect to Mongoose
mongoose.connect('mongodb://pranav:pranav@ds157349.mlab.com:57349/snomed');
var db = mongoose.connection;

app.get('/',function(req,res){

   res.send('Hello World!');

});

app.get('/api/concepts',function(req,res){

Concept.getConcepts(function(err,Concept){
     if(err){

     	throw err;
     }
     res.json(Concept);
     console.log(Concept);

});

});

app.get('/api/concepts/:_conceptId',function(req,res){

Concept.getConceptById(req.params._conceptId,function(err,Concept){
     if(err){

     	throw err;
     }
     res.json(Concept);
     console.log(Concept);

});

});

app.get('/api/icd9codes/:_icd9code',function(req,res){
    
    Concept.getIcd9codes(req.params._icd9code,function(err,Concept){
         if(err){
    
             throw err;
         }
         res.json(Concept);
         console.log(Concept);
    
    });
    
    });

app.get('/api/icd10codes/:_icd10code',function(req,res){
    
    Concept.getIcd10codes(req.params._icd10code,function(err,Concept){
            if(err){
    
                throw err;
            }
            res.json(Concept);
            console.log(Concept);
    
    });
    
    });

app.get('/api/getStats/:_searchTerm',function(req,res){
    
    Concept.getStats(req.params._searchTerm,function(err,stats){
         if(err){
    
             throw err;
         }
         res.json(stats);
         console.log(stats);
    
    });
    
});


app.get('/api/descriptions/:_term',function(req,res){

Concept.getDescription(req.params._term,function(err,descriptions){
     if(err){

     	throw err;
     }
     res.json(descriptions);
     console.log(descriptions);

});

});

app.get('/api/icd9Names/:_term',function(req,res){
    
Concept.getIcd9Names(req.params._term,function(err,descriptions){
        if(err){

            throw err;
        }
        res.json(descriptions);
        console.log(descriptions);

});

});

app.get('/api/icd10Names/:_term',function(req,res){
    
Concept.getIcd10Names(req.params._term,function(err,descriptions){
        if(err){

            throw err;
        }
        res.json(descriptions);
        console.log(descriptions);

});

});



app.listen(3000);
console.log('Running on port 3000...');