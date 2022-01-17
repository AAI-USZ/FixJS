function(user) {
    var userName = user.name;

    if (challengeList[opponentName] === userName) {
      delete challengeList[opponentName];

      Users.get({name: opponentName}, this.e(function(opponent) {
        var opponentID = opponent._id;
        launchBattle(userID, opponentID);
      }));
    } else {
      challengeList[userName] = opponentName;
    }
  }