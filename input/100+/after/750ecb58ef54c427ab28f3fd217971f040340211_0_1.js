function(e) {
        var morphemesLine = $(e.currentTarget).val();
        if (morphemesLine) {
          var glossLine = Glosser.glossFinder(morphemesLine);
          if (this.$el.find(".gloss .datum_field_input").val() == "") {
            // If the gloss line is empty, make it a copy of the morphemes
            this.$el.find(".gloss .datum_field_input").val(morphemesLine);
            
            this.needsSave = true;
          }
          // If the guessed gloss is different than the existing glosses
          if (glossLine != morphemesLine && glossLine != "") {
            // Ask the user if they want to use the guessed gloss
            if (confirm("Would you like to use this gloss:\n" + glossLine)) {
              // Replace the gloss line with the guessed gloss
              this.$el.find(".gloss .datum_field_input").val(glossLine);
              
              this.needsSave = true;
            }
          }
          
          
        }
      }