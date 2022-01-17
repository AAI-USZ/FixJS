function update_board_model(clickedObject) {
  var clickedID = $(clickedObject).attr('id');
  var currentPlayer = gameState['state']['player'];
  var currentPlayerBets = gameState['bets'][clickedID][currentPlayer];
  var maxBet = gameState['max'];
  var totalPlayerBets = gameState['totals'][currentPlayer];
  var totalPlayerChips = gameState['chips'][currentPlayer];
  
  if (currentPlayer == 'none') {
    alert('Please select a player.');
  } else {
    // Add a bet.
    if (gameState['state']['undo'] == 0 && totalPlayerBets < maxBet) {
      if (totalPlayerChips > 0) {
        gameState['bets'][clickedID][currentPlayer] = currentPlayerBets + 1;
        gameState['totals'][currentPlayer] = totalPlayerBets + 1;
        gameState['chips'][currentPlayer] = totalPlayerChips - 1;
        
        update_view(gameState['state']['player'], clickedID, 0, 1);
        
        restack(clickedID);
      } else {
        alert('No more chips to make the bet.');
      }
    } else if (gameState['state']['undo'] == 1) {
      // Undo a bet.
      if (currentPlayerBets > 0 && totalPlayerBets > 0) {
        gameState['bets'][clickedID][currentPlayer] = currentPlayerBets - 1;
        gameState['totals'][currentPlayer] = totalPlayerBets - 1;
        gameState['chips'][currentPlayer] = totalPlayerChips + 1;
        
        // Calculate some vars needed for undoing.
        if (currentPlayer == 'team1') {
          player = 'token ' + team1;
        } else {
          player = 'token ' + team2;
        }
        var chipsHere = $('#' + clickedID).children();
        var count = chipsHere.length - 1;
        var loop = true;
        
        // Remove the current player's most recent bet from the clicked bet.
        while (count >= 0 && loop) {
          var currChip = $(chipsHere.get(count));
          
          if (currChip.attr('class') == player) {
            $($('#' + clickedID).children().get(count)).remove();
            loop = false;
          }
          
          count--;
        }
        
        // Straighten the current chip pile.
        restack(clickedID);
        
        // Update the chip pile.
        update_chips(gameState['chips']['team1'], gameState['chips']['team2']);
      } else if (totalPlayerBets > 0) {
        alert('No bet to remove on this spot.');
      } else {
        alert('Player has no bets to remove.');
      }
    } else if (totalPlayerBets == maxBet) {
      alert('Maximum number of bets have been made.');
    }
  }
}