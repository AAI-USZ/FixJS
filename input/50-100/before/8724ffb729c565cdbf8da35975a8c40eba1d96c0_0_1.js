function(snapshot, callback) {
    var _winA = _IsWinner(snapshot.A, snapshot.Players().Player1);    
    if(_winA.won) {
      callback(_winA);
    }
    
    var _winB = _IsWinner(snapshot.B, snapshot.Players().Player2);    
    if(_winB.won) {
      callback(_winB);
    }
  }