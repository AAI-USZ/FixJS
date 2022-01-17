function() {
    if(useAbility(abilities, 'peek', $('#left_buttons').find('.peek'))) {
      them.setValue(opponentText);
      setTimeout(function() {
        them.setValue(censor(opponentText));
      }, 1500);
      socket.emit('peek');
    }
  }