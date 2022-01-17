function(data) {
      var currentMessage, currentPlayer, message, player,
        _this = this;
      if (!(message = data.message)) {
        return;
      }
      if (!data.countedMilk && data.message.indexOf('milk') !== -1) {
        this.score.increase('milk');
        data.countedMilk = true;
      }
      player = data.self ? this.player : this.players[data.id];
      if (data.voice) {
        player.voice = data.voice;
      }
      player.setText(message);
      player.stageText();
      if (player.speechTimeout) {
        clearTimeout(player.speechTimeout);
        player.speechTimeout = null;
      }
      if (this.currentSpeech) {
        currentPlayer = this.currentSpeech.player;
        currentMessage = this.currentSpeech.message;
        currentPlayer.speechTimeout = setTimeout((function() {
          return currentPlayer.clearText(currentMessage);
        }), 1000);
      }
      this.currentSpeech = {
        player: player,
        message: message
      };
      return speak.play(message, player.voice || {}, function() {
        _this.currentSpeech = null;
        return player.clearText(message);
      });
    }