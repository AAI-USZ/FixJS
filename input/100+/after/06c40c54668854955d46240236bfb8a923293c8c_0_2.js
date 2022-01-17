function reset_board_model() {
  var bets = gameState['bets'];
  
  // Reset bet values to zero.
  for (var bet in bets) {
    if (bets.hasOwnProperty(bet)) {
      gameState['bets'][bet]['team1'] = 0;
      gameState['bets'][bet]['team2'] = 0;
    }
  }
  
  // Reset drink counts.
  gameState['drinks']['team1'] = 0;
  gameState['drinks']['team2'] = 0;
  
  // Reset bet totals to zero.
  gameState['totals']['team1'] = 0;
  gameState['totals']['team2'] = 0;
  
  // Reset the chips.
  gameState['chips']['team1'] = gameState['bank'];
  gameState['chips']['team2'] = gameState['bank'];
  
  // Reset state values.
  gameState['state']['spins'] = 1;
  gameState['state']['undo'] = 0;
}