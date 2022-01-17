function(me, i) {
    var opponent = players[i^1];
    
    // Ready function sends the current question
    me.emit('ready', {
      me: me.user
    , opponent: opponent.user
    , question: currentQuestion
    });

    // When a player enters text, inform the opponent
    me.on('textEntered', function(data) {
      var text = data.text;
      opponent.emit('textUpdate', { text: text });
    });

    // For the battle actions, simply relay the command from player to player
    me.on('remove', function() {
      opponent.emit('remove');
    });

    me.on('swap', function() {
      opponent.emit('swap');
    });
    
    // Handle client compile events
    me.on('compile', function(data) {
      
      // If outputs is on the data object that means the client thinks that they all passed
      // We're just double checking the see if it's true
      if (data.outputs){
        currentQuestion.alwaysTest.forEach(function(test, i){
          if (data.outputs[i] !== currentQuestion.answer(test)) {
            data.worked = false;
            me.emit('cheating', {msg:'<div><h1>Hey you there!</h1>'
              + '<p>Are you messing with the client code?</p>'
              + '<p>If so we would like to enlist your help in improving hackadoo.</br>'
              + '  E-mail us at team@hackadoo.com</p>'});
          }
        });
      }
      
      // TODO: We need to add a second step that sends back some random inputs back to the client
      // this is so that the client can't just write a bunch of if statements to handle the unit tests      
      
      // send the compile status to the opponent
      opponent.emit('compile', {worked:data.worked});
    });

    me.on('peek', function() {
      opponent.emit('peek');
    });
  }