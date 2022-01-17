function(corpusname, callback){
      var self = this;
      $.ajax({
        type : 'GET',
        url : "https://ilanguage.iriscouch.com/"+corpusname+"/_design/lexicon/_view/create_triples?group=true",
        success : function(results) {
          var lexiconTriples = JSON.parse(results).rows;
          for(triple in lexiconTriples){
            if (! self.get("lexiconNodes")){
              self.set("lexiconNodes", new LexiconNodes());
            }
            self.get("lexiconNodes").add(new LexiconNode({morpheme: lexiconTriples[triple].key.morpheme , allomorphs: [lexiconTriples[triple].key.morpheme], gloss: lexiconTriples[triple].key.gloss, value: lexiconTriples[triple].value}));
          }
          if (typeof callback == "function"){
            callback();
          }
        },// end successful response
        dataType : ""
      });
    }