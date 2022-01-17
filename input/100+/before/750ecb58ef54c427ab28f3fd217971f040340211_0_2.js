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
          if (morphemesLine != utteranceLine) {
            // Ask the user if they want to use the guessed morphemes
            if (confirm("Would you like to use these morphemes:\n" + morphemesLine)) {
              // Replace the morphemes line with the guessed morphemes
              this.$el.find(".morphemes .datum_field_input").val(morphemesLine);
              
              this.needsSave = true;
            }
          }
          
          // Guess a gloss
          var morphemeGroup = morphemesLine.split(/ +/);
          var glossGroups = [];
          var lexiconNodes = window.app.get("corpus").lexicon.get("lexiconNodes");
          for (var group in morphemeGroup) {
            var morphemes = morphemeGroup[group].split("-");
            var glosses = [];
            for (var m in morphemes) {
              // Take the first gloss for this morpheme
              var matchingNode = _.max(lexiconNodes.where({morpheme: morphemes[m]}), function(node) { return node.get("value"); });
              console.log(matchingNode);
              // var matchingNode = lexiconNodes.where({morpheme: morphemes[m]})[0];
              var gloss = "??";   // If there's no matching gloss, use question marks
              if (matchingNode) {
                gloss = matchingNode.get("gloss");
              }
              glosses.push(gloss);
            }
            
            glossGroups.push(glosses.join("-"));
          }
          
          // Replace the gloss line with the guessed glosses
          this.$el.find(".gloss .datum_field_input").val(glossGroups.join(" "));
        }
      }