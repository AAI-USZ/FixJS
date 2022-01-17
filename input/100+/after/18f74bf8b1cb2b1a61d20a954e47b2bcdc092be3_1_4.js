function initialize_game() {
  gameState['bank'] = $('#starting-bank').val();
  var startBank = gameState['bank'];
  var minBet = $('#min-bet').val();
  var maxBet = $('#max-bet').val();
  
  gameState['chips']['team1'] = startBank;
  gameState['chips']['team2'] = startBank;
  gameState['min'] = minBet;
  gameState['max'] = maxBet;
  
  // Initialize scores.
  $('#team1-score').text(gameState['drinks']['team2']);
  $('#team2-score').text(gameState['drinks']['team1']);
  
  // Set min and max display.
  $('#min-number').text(minBet);
  $('#max-number').text(maxBet);
  
  // Setup chip area.
  update_chips(startBank, startBank);
  
  // Set current player.
  var currPlayer = gameState['state']['player'];
  if (currPlayer == 'team1') {
    $('#team1-chips').css('background', '#77b3a2');
  } else {
    $('#team2-chips').css('background', '#77b3a2');
  }
  
  // Display gameboard.
  $('#form').fadeOut(100, 'linear', function() {
    $('#form').remove();
  });
  $('#title').fadeOut(100, 'linear', function() {
    $('#title').remove();
  });
  
  $('#game-table').fadeIn(100, 'linear');
  
  draw_wheel();
}