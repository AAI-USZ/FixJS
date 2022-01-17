function() {
      Utils.debug("DATUM render: " + this.el);
      
      if (this.format == "well") {        
        // Display the DatumReadView
        var jsonToRender = this.model.toJSON();
        jsonToRender.datumStates = this.model.get("datumStates").toJSON();
        $(this.el).html(this.template(jsonToRender));
        
        // Display the DatumTagsView
        this.datumTagsView.el = this.$(".datum_tags_ul");
        this.datumTagsView.render();
        
        // Display the DatumFieldsView
        this.datumFieldsView.el = this.$(".datum_fields_ul");
        this.datumFieldsView.render();
        // This bit of code makes the datum look like its rendered by
        // latex, could be put into a function, but not sure if thats
        // necessary...
      } else if (this.format == "latex") {
        
        //This gets the fields necessary from the model
        utterance= this.model.get("datumFields").where({label: "utterance"})[0].get("value");
        gloss = this.model.get("datumFields").where({label: "gloss"})[0].get("value");
        translation= this.model.get("datumFields").where({label: "translation"})[0].get("value");
        
        //makes the top two lines into an array of words.
        utteranceArray = utterance.split(' ');
        glossArray = gloss.split(' ');
        
        //for loop aligns each word in the utterance with a word in the  gloss
        glossCouplet = [];
        var i = 0;
        for (i; i < utteranceArray.length; i++) {
          glossCouplet = utteranceArray[i] +"<br>"+ glossArray[i];
          this.$el.append('<span class ="glossCouplet">'+ glossCouplet + '</span>');
        };
        
        //adding a checkbox
        this.$el.prepend('<input type="checkbox" class="styled datum-checkboxes"/> &nbsp &nbsp');
        //adding the translation on the final line.
        this.$el.append('<br>'+translation);
      }
      return this;
    }