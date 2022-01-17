function determine_outcome(winningNumber) {
  winningBets = determine_winning_bets(parseInt(winningNumber));
  
  $.each(winningBets, function(index, value) {
    var betToCheck = 'bet-' + value;
    var betsTeam1 = gameState['bets'][betToCheck]['team1'];
    var betsTeam2 = gameState['bets'][betToCheck]['team2'];
    
    if (gameState['totals']['team1'] >= gameState['min'] && betsTeam1 > 0) {
      gameState['drinks']['team2'] = gameState['drinks']['team2'] + betsTeam1;
    }
    
    if (gameState['totals']['team2'] >= gameState['min'] && betsTeam2 > 0) {
      gameState['drinks']['team1'] = gameState['drinks']['team1'] + betsTeam2;
    }
  });
  
  // Update view so that the score board will reflect new wins/losses.
  update_view('neither', null);
  
  var drinksT1 = gameState['drinks']['team1'];
  var drinksT2 = gameState['drinks']['team2'];
  
  // Send drink updates to server.
  $.ajax({
    url: 'http://findaaron.nfshost.com/Robolette/php/update_counts.php',
    type: 'GET',
    data: {team_one: drinksT1, team_two: drinksT2}
  });
  
  // -------- Reset temporary values in the model -------- //
  
  var bets = gameState['bets'];
  
  // Reset bet values to zero.
  for (var bet in bets) {
    if (bets.hasOwnProperty(bet)) {
      gameState['bets'][bet]['team1'] = 0;
      gameState['bets'][bet]['team2'] = 0;
    }
  }
  
  // Reset drink values to zero.
  gameState['drinks']['team1'] = 0;
  gameState['drinks']['team2'] = 0;
  
  // Reset bet totals to zero.
  gameState['totals']['team1'] = 0;
  gameState['totals']['team2'] = 0;
  
  // Reset state values.
  gameState['state']['changes'] = 1;
  gameState['state']['player'] = 'none';
  gameState['state']['spins'] = 1;
  gameState['state']['undo'] = 0;
  
  update_view('neither', null);
}