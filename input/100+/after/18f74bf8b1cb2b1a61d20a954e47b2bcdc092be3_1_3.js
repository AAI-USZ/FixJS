function determine_outcome(winningNumber) {
  winningBets = determine_winning_bets(parseInt(winningNumber));
  
  $.each(winningBets, function(index, value) {
    var betToCheck = 'bet-' + value;
    var betsTeam1 = gameState['bets'][betToCheck]['team1'];
    var betsTeam2 = gameState['bets'][betToCheck]['team2'];
    
    if (gameState['totals']['team1'] >= gameState['min'] && betsTeam1 > 0) {
      gameState['drinks']['team2'] += betsTeam1;
    }
    
    if (gameState['totals']['team2'] >= gameState['min'] && betsTeam2 > 0) {
      gameState['drinks']['team1'] += betsTeam2;
    }
  });
  
  // Update view so that the score board will reflect new wins/losses, etc.
  update_view('neither', null, 1);
  
  // Get drinks to be poured.
  var drinksT1 = gameState['drinks']['team1'];
  var drinksT2 = gameState['drinks']['team2'];
  
  // Send drink updates to server.
  $.ajax({
    url: 'http://findaaron.nfshost.com/Robolette/php/update_counts.php',
    type: 'GET',
    data: {team_one: drinksT1, team_two: drinksT2}
  });
  
  // Reset board for new round.
  reset_board_model();
}