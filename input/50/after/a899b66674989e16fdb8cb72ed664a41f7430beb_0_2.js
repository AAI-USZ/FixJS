function() {
    if(useAbility(abilities, 'remove', leftButtons.find('.remove'))) {
      socket.emit('remove');
    }
  }