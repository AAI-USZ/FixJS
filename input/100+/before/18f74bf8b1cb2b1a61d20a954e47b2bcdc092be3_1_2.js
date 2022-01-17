function(index, value) {
    var betToCheck = 'bet-' + value;
    var betsTeam1 = gameState['bets'][betToCheck]['team1'];
    var betsTeam2 = gameState['bets'][betToCheck]['team2'];
    
    if (gameState['totals']['team1'] >= gameState['min'] && betsTeam1 > 0) {
      gameState['drinks']['team2'] = gameState['drinks']['team2'] + betsTeam1;
    }
    
    if (gameState['totals']['team2'] >= gameState['min'] && betsTeam2 > 0) {
      gameState['drinks']['team1'] = gameState['drinks']['team1'] + betsTeam2;
    }
  }