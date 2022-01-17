function(user) {
    var opponentID = user._id;

    if (challengeList[opponentID] === userID) {
      delete challengeList[opponentID];
      launchBattle(userID, opponentID);
    } else {
      challengeList[userID] = opponentID;
    }
  }