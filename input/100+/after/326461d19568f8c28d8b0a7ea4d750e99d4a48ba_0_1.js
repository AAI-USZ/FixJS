function() {
      // http://www.joezimjs.com/javascript/introduction-to-backbone-js-part-5-ajax-video-tutorial/
//      this.on('all', function(e) {
//        Utils.debug(this.get('title') + " event: " + JSON.stringify(e));
//      }); 

      if(typeof(this.get("datumStates")) == "function"){
        this.set("datumStates", new DatumStates([ 
          new DatumState()
          ,new DatumState({
            state : "To be checked",
            color : "warning"
          }),
          , new DatumState({
            state : "Deleted",
            color : "important"
          }),
        ]));
      }//end if to set datumStates
      
      if(typeof(this.get("datumFields")) == "function"){
        this.set("datumFields", new DatumFields([ 
          new DatumField({
            label : "judgement",
            size : "3",
            encrypted: "",
            userchooseable: "disabled",
            help: "Use this field to establish your team's gramaticality/acceptablity judgements (*,#,? etc)"
          }),
          new DatumField({
            label : "utterance",
            encrypted: "checked",
            userchooseable: "disabled",
            help: "Use this as Line 1 in your examples for handouts (ie, either Orthography, or phonemic/phonetic representation)"
          }),
          new DatumField({
            label : "morphemes",
            encrypted: "checked",
            userchooseable: "disabled",
            help: "This line is used to determine the morpheme segmentation to generate glosses, it also optionally can show up in your LaTeXed examples if you choose to show morpheme segmentation in addtion ot line 1, gloss and translation."
          }),
          new DatumField({
            label : "gloss",
            encrypted: "checked",
            userchooseable: "disabled",
            help: "This line appears in the gloss line of your LaTeXed examples, we reccomend Leipzig conventions (. for fusional morphemes, - for morpehem boundaries etc) The system uses this line to partially help you in glossing. "
          }),
          new DatumField({
            label : "translation",
            encrypted: "checked",
            userchooseable: "disabled",
            help: "Use this as your primary translation. It does not need to be English, simply a language your team is comfortable with. If your consultant often gives you multiple languages for translation you can also add addtional translations in the customized fields. For example, your Quechua informants use Spanish for translations, then you can make all Translations in Spanish, and add an additional field for English if you want to generate a handout containing the datum. "
          })
        ]));
      }//end if to set datumFields
      
      if(typeof(this.get("sessionFields")) == "function"){
        this.set("sessionFields", new DatumFields([ 
           new DatumField({
             label : "goal",
             encrypted: "",
             userchooseable: "disabled",
             help: "This describes the goals of the session."
           }),  
          new DatumField({
            label : "consultants",
            encrypted: "",
            userchooseable: "disabled"
          }),
          new DatumField({
            label : "dialect",
            encrypted: "",
            userchooseable: "disabled",
            help: "You can use this field to be as precise as you would like about the dialect of this session."
          }),
          new DatumField({
            label : "language",
            encrypted: "",
            userchooseable: "disabled",
            help: "This is the langauge (or language family) if you would like to use it."
          }),
          new DatumField({
            label : "dateElicited",
            encrypted: "",
            userchooseable: "disabled",
            help: "This is the date in which the session took place."
          }),
          new DatumField({
            label : "user",
            encrypted: "",
            userchooseable: "disabled"
          }),
          new DatumField({
            label : "dateSEntered",
            encrypted: "",
            userchooseable: "disabled",
            help: "This is the date in which the session was entered."
          }),
        ]));
        
      }//end if to set sessionFields
      
      // If there are no comments, give it a new one
      if (!this.get("comments")) {
        this.set("comments", new Comments());
      }
      
      if (!this.get("dataLists")) {
        this.set("dataLists", new DataLists());
      }
      
      if (!this.get("sessions")) {
        this.set("sessions", new Sessions());
      }
      
      if (!this.get("permissions")) {
        this.set("permissions", new Permissions());
      }
      
      
//      this.pouch = Backbone.sync
//      .pouch(Utils.androidApp() ? Utils.touchUrl
//          + this.get("corpusname") : Utils.pouchUrl
//          + this.get("corpusname"));
//        if(typeof(this.get("searchFields")) == "function"){
//          this.set("searchFields", 
//              this.get("datumFields"));
//          this.set("searchFields",
//              this.get("sessionFields"));
//            new DatumFields([ 
          //TODO add the session fields here too, instead of just the datumFields
//          ]));
 //     }//end if to set sessionFields
    }