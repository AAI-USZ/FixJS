function(snapshot, callback) {
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
  }