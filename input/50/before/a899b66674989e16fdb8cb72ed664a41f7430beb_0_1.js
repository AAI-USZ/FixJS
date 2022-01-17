function() {
    if(useAbility(abilities, 'swap', $('#left_buttons').find('.swap'))) {
      socket.emit('swap');
    }
  }