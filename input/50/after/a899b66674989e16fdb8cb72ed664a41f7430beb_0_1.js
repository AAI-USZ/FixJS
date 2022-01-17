function() {
    if(useAbility(abilities, 'swap', leftButtons.find('.swap'))) {
      socket.emit('swap');
    }
  }