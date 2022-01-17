function(corpusname, callback){
      $.ajax({
        type : 'GET',
        url : "http://ilanguage.iriscouch.com/"+corpusname+"/_design/lexicon/_view/create_triples?group=true",
        success : function(results) {
          var lexiconTriples = results.rows;
          for(triple in lexiconTriples){
            this.lexiconNodes.add(new LexiconNode({morpheme: lexiconTriples[triple].key.morpheme , allomorphs: [lexiconTriples[triple].key.morpheme], gloss: lexiconTriples[triple].key.gloss, value: lexiconTriples[triple].value}));
          }
          if (typeof callback == "function"){
            callback();
          }
        },// end successful response
        dataType : ""
      });
    }