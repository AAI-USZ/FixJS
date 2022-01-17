function() {
    if(useAbility(abilities, 'remove', $('#left_buttons').find('.remove'))) {
      socket.emit('remove');
    }
  }