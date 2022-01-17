function(e) {
        var utteranceLine = $(e.currentTarget).val();
        if (utteranceLine) {
          var morphemesLine = Glosser.morphemefinder(utteranceLine);
          if (this.$el.find(".morphemes .datum_field_input").val() == "") {
            // If the morphemes line is empty, make it a copy of the utterance
            this.$el.find(".morphemes .datum_field_input").val(utteranceLine);
            
            this.needsSave = true;
          }
          // If the guessed morphemes is different than the unparsed utterance 
          if (morphemesLine != utteranceLine && morphemesLine != "") {
            // Ask the user if they want to use the guessed morphemes
            if (confirm("Would you like to use these morphemes:\n" + morphemesLine)) {
              // Replace the morphemes line with the guessed morphemes
              this.$el.find(".morphemes .datum_field_input").val(morphemesLine);
              
              this.needsSave = true;
            }
          }
        }
      }