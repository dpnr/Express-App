var express = require('express');

var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var csv = require('csv');
let headers = ['name','badgevalue','children']
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const testFolder = './sessions/';
const fs = require('fs');


Concept = require('./models/concept');

//connect to Mongoose
mongoose.connect('mongodb://pranav:pranav@ds157349.mlab.com:57349/snomed');
var db = mongoose.connection;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/',function(req,res){

   res.send('Hello World!');

});

app.get('/api/concepts',function(req,res){

Concept.getConcepts(function(err,Concept){
     if(err){

     	throw err;
     }
     res.json(Concept);
    //  console.log(Concept);

});

});

app.get('/api/concepts/:_conceptId',function(req,res){

Concept.getConceptById(req.params._conceptId,function(err,Concept){
     if(err){

     	throw err;
     }
     res.json(Concept);
    //  console.log(Concept);

});

});

app.get('/api/icd9codes/:_icd9code',function(req,res){
    
    Concept.getIcd9codes(req.params._icd9code,function(err,Concept){
         if(err){
    
             throw err;
         }
         res.json(Concept);
        //  console.log(Concept);
    
    });
    
    });

app.get('/api/icd10codes/:_icd10code',function(req,res){
    
    Concept.getIcd10codes(req.params._icd10code,function(err,Concept){
            if(err){
    
                throw err;
            }
            res.json(Concept);
            // console.log(Concept);
    
    });
    
    });

app.get('/api/getStatsSct/:_searchTerm',function(req,res){
    
    Concept.getStatsSct(req.params._searchTerm,function(err,stats){
         if(err){
    
             throw err;
         }
         res.json({"total":66257 ,"word":stats.length});
        //  console.log(stats);
    
    });
    
});

app.get('/api/getStatsIcd9/:_searchTerm',function(req,res){
    
    Concept.getStatsIcd9(req.params._searchTerm,function(err,stats){
         if(err){
    
             throw err;
         }
         res.json({"total":7956 ,"word":stats.length});
        //  console.log(stats);
    
    });
    
});

app.get('/api/getStatsIcd10/:_searchTerm',function(req,res){
    
    Concept.getStatsIcd10(req.params._searchTerm,function(err,stats){
         if(err){
    
             throw err;
         }
         res.json({"total":14143 ,"word":stats.length});
        //  console.log(stats);
    
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

////////////////////////////////////////////////////////////////////////////////////
//####   Getting the files from the sessions folder       ####//

app.get('/api/getFiles',function(req,res){

fs.readdir(testFolder, (err, files) => {
  filenames = []
  files.forEach(file => {
    filenames.push(file)
  });

  res.json(filenames)
})

});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

app.post('/api/createFile/',function(req,res){
    
    
    
    console.log(req.body)
    filename = 'test.csv'
    console.log("write into "+'test.csv' )
    // csv.from.array(headers).to.path('./sessions/'+filename);

    
    const csvWriter = createCsvWriter({
        path: './sessions/'+filename,
        header: [
            {id: 'name', title: 'NAME'},
            {id: 'value', title: 'NODE_VALUE'},
            {id: 'children', title: 'CHILDREN'}
        ]
    });

    const records = [];
     
    csvWriter.writeRecords(records)       // returns a promise 
        .then(() => {
            console.log('...Done');
        });


   
    res.send({status:'sucess'})
    
});

////////////////////////////////////////////////////////////////////////////////////
app.listen(3000);
console.log('Running on port 3000...');