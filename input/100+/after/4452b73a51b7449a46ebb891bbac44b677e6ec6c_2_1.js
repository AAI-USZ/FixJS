function() {
      var self = this;

      var loader = new PxLoader();
      var tableImage = this.getTableImageFile();
      loader.addImage(tableImage);

      var deckImage = this.getDeckImageFile();
      loader.addImage(deckImage);
  
      var teamName; 
      for (teamName in conf.teamFlags) { 
        var teamImageFile = this.getTeamImageFile(teamName);
        var smallTeamImageFile = this.getTeamImageFile(teamName, 'small');
        loader.addImage(teamImageFile);
        loader.addImage(smallTeamImageFile);
      }
      
      var suit; 
      var i;
      for (suit in constants.SUIT_TRANSLATION_TABLE) {
        for(i=2; i < 15; i++) {
          var cardImageFile = this.getCardImageFile(i, suit);
          loader.addImage(cardImageFile);
        }
      }

      var trumpSuit;
      for (trumpSuit in conf.suitIcons) {
        var iconImage = this.getSuitImageFile(trumpSuit);
        loader.addImage(iconImage);
      }

      var charCode;
      var num;
      for(charCode=65; charCode < 80; charCode++) {
        for(num=1; num < 6; num++) {
          var letter = String.fromCharCode(charCode);
          var avatarImage = this.getAvatarImageFile(letter, num);
          //loader.addImage(avatarImage);
        }
      }

      loader.addCompletionListener(function() {
          self.clearProgressOverlay();
          self.showSplash();
      });

      loader.addProgressListener(function(e) {
          self.updateProgressOverlay(e);
      });

      return loader;
    }