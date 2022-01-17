function update_view(player, object) {
  var bets = gameState['bets'];
  var tokenCount = 2;
  
  // Update bets.
  for (var bet in bets) {
    if (bets.hasOwnProperty(bet)) {
      // Show team one's chips on the table.
      if (gameState['bets'][bet]['team1'] > 0 && player == 'team1') {
        if (bet == object) {
          // Calculate vars needed to position chip.
          var parentMidX = $('#' + bet).width() / 2;
          var parentMidY = $('#' + bet).height() / 2;
          var tokenMid = 10;
          var leftVal = parentMidX - tokenMid;
          var topVal = parentMidY - tokenMid;
          
          // Stagger placement of chips so the stack can be seen.
          var numChipsHere = $('#' + bet).children().size();
          if (numChipsHere > 0) {
            topVal = topVal - 2 * numChipsHere;
          }
          
          $('#' + bet).css('position', 'relative');
          $('#' + bet).css('z-index', '1');
          
          // Add chip to the table.
          var chip = $('<div class="token blue">' +
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
          chip.css('left', leftVal);
          chip.css('top', topVal);
          chip.css('z-index', tokenCount);
          $('#' + bet).append(chip);
          
          tokenCount++;
        }
      }
        
      // Show team two's chips on the table.
      if (gameState['bets'][bet]['team2'] > 0 && player == 'team2') {
        if (bet == object) {
          // Calculate vars needed to position chip.
          var parentMidX = $('#' + bet).width() / 2;
          var parentMidY = $('#' + bet).height() / 2;
          var tokenMid = 10;
          var leftVal = parentMidX - tokenMid;
          var topVal = parentMidY - tokenMid;
          
          // Stagger placement of chips so the stack can be seen.
          var numChipsHere = $('#' + bet).children().size();
          if (numChipsHere > 0) {
            topVal = topVal - 2 * numChipsHere;
          }
          
          $('#' + bet).css('position', 'relative');
          $('#' + bet).css('z-index', '1');
          
          // Add chip to the table.
          var chip = $('<div class="token yellow">' +
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
          chip.css('left', leftVal);
          chip.css('top', topVal);
          chip.css('z-index', tokenCount);
          $('#' + bet).append(chip);
          
          tokenCount++;
        }
      } 
    }
  }
  
  update_chips(gameState['chips']['team1'], gameState['chips']['team2']);
  
  // Update scores.
  $('#team1-score').text(gameState['drinks']['team2']);
  $('#team2-score').text(gameState['drinks']['team1']);
}