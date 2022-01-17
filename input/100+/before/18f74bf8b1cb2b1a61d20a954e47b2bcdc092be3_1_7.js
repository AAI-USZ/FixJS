function update_chips(chipsT1, chipsT2) {
  $('#team1-chips').empty();
  $('#team2-chips').empty();
  var parentXMidpoint = 50;
  var parentYMidpoint = 30;
  var tokenMid = 10;
  
  var tokenCount = 2;
  for (var i = 0; i < chipsT1; i++) {
    // Calculate vars needed to position chip.
    var leftVal = parentXMidpoint - tokenMid;
    var topVal = parentYMidpoint - tokenMid;
    
    var numChipsPlaced = i;
    if (numChipsPlaced > 0) {
      topVal = topVal - 2 * numChipsPlaced;
    }
    
    var chipTeam1 = $('<div class="token blue">' +
                        '<div class="token-top-stripe1"></div>' +
                        '<div class="token-top-stripe2"></div>' +
                        '<div class="token-right-stripe1"></div>' +
                        '<div class="token-right-stripe2"></div>' +
                        '<div class="token-bottom-stripe1"></div>' +
                        '<div class="token-bottom-stripe2"></div>' +
                        '<div class="token-left-stripe1"></div>' +
                        '<div class="token-left-stripe2"></div>' +
                        '<div class="token-ring">1</div>' +
                      '</div>');
    chipTeam1.css('left', leftVal);
    chipTeam1.css('top', topVal);
    chipTeam1.css('z-index', tokenCount);
    $('#team1-chips').append(chipTeam1);
    
    tokenCount++;
  }
  
  tokenCount = 2;
  for (var j = 0; j < chipsT2; j++) {
    // Calculate vars needed to position chip.
    var leftVal = parentXMidpoint - tokenMid;
    var topVal = parentYMidpoint - tokenMid;
    
    var numChipsPlaced = j;
    if (numChipsPlaced > 0) {
      topVal = topVal - 2 * numChipsPlaced;
    }
    
    var chipTeam2 = $('<div class="token yellow">' +
                        '<div class="token-top-stripe1"></div>' +
                        '<div class="token-top-stripe2"></div>' +
                        '<div class="token-right-stripe1"></div>' +
                        '<div class="token-right-stripe2"></div>' +
                        '<div class="token-bottom-stripe1"></div>' +
                        '<div class="token-bottom-stripe2"></div>' +
                        '<div class="token-left-stripe1"></div>' +
                        '<div class="token-left-stripe2"></div>' +
                        '<div class="token-ring">1</div>' +
                      '</div>');
    chipTeam2.css('left', leftVal);
    chipTeam2.css('top', topVal);
    chipTeam2.css('z-index', tokenCount);
    $('#team2-chips').append(chipTeam2);
    
    tokenCount++;
  }
  
  // Update chips count display.
  $('#team1-chips').append('<div class="chip-counts">' + gameState['chips']['team1'] + '</div>');
  $('#team2-chips').append('<div class="chip-counts">' + gameState['chips']['team2'] + '</div>');
  
  if (gameState['state']['undo']) {
    currentPlayer = gameState['state']['player'];

    if (currentPlayer == 'team1') {
      $('#team1-chips').append('<div id=\"team1-undo-flag\">undo</span> <i class=\"icon-remove-sign\"></i></div>');
    } else if (currentPlayer == 'team2') {
      $('#team2-chips').append('<div id=\"team2-undo-flag\">undo <i class=\"icon-remove-sign\"></i></div>');
    } else {
      alert('No bets have been made.');
    }
  }
}