function() {
  var _winmap = [['A1', 'A2', 'A3'],
                 ['B1','B2','B3']];

  var _didIWin = function(snapshot, callback) {
    var _winA = _IsWinner(snapshot.A, snapshot.Players().Player1);    
    if(_winA.won) {
      callback(_winA);
    }
    
    var _winB = _IsWinner(snapshot.B, snapshot.Players().Player2);    
    if(_winB.won) {
      callback(_winB);
    }
  };

  var _IsWinner = function(moves, player) {
    var result; 
    var win = {};
    var match = _.any(_winmap, function(combo) {
      if(combo.compare(moves)) {
        result = combo;
        return true;
      }
    });
    if (match) {
      win.player = player;
      win.won = true;
      win.slots = result;
    }
    return win; 
  };

  return  {
    didIWin: _didIWin
  };
}