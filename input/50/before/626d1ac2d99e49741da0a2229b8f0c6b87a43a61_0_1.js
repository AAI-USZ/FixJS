function(room) {
    Session.set('room', room);
    Players.update(Session.get('player_id'), {$set: {room: room}});
  }