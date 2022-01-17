function() {
  var _winmap = [
    ['A1', 'A2', 'A3'],
    ['B1','B2','B3'],
    ['C1','C2','C3'], 
    ['A1', 'B1', 'C1'],
    ['A2', 'B2', 'C2']
    ];

  var _didIWin = function(snapshot, callback) {
    var _win = {
      player: '',
      won: false,
      slots: []
    };

    var _winA = _IsWinner(snapshot.A, snapshot.Players().Player1);    
    if(_winA.won) {
      _win = _winA;
    }
    
    var _winB = _IsWinner(snapshot.B, snapshot.Players().Player2);    
    if(_winB.won) {
      _win = _winB;
    }

    callback(_win);
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