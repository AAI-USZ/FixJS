function stop_wheel() {
  // Stop the wheel.
  clearTimeout(spinTimeout);
  
  // Calculate what number the ball landed on.
  var radiansSpun = startAngle - (1.5 * Math.PI);
  var unitsSpun = radiansSpun / arc;
  var number = Math.ceil(unitsSpun % 37);
  if (number == 0) {
    number = 37;
  }
  var index = 37 - number;
  context.save();
  var winningNumber = numbers[index];
  
  // Determine winners and update the view if bets have been made.
  if (gameState['totals']['team1'] != 0 && gameState['totals']['team2'] != 0) {
    determine_outcome(winningNumber); 
  } else {
    update_view('neither', null, 1, 0);
    reset_board_model();
  }
}