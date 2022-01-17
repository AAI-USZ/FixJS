function(corpusname, callback){
      this.get("lexicon").buildLexiconFromCouch(corpusname,callback);
    }