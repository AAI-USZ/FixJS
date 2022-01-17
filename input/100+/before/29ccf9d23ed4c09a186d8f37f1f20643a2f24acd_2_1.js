function() {
  this.view_.innerHTML = '';

  var localPlayer = this.playerIndex_.getLocalPlayer();
  var players = this.playerIndex_.getPlayers();

  // TODO(sharvil): don't access points_ directly.
  goog.array.stableSort(players, function(p1, p2) {
    return p2.points_ - p1.points_;
  });

  for (var i = 0; i < players.length; ++i) {
    var player = players[i];

    var nameNode = goog.dom.createElement('span');
    nameNode.classList.add(dotprod.views.ScoreboardView.NAME_CLASS_NAME_);
    nameNode.innerText = player.getName();

    var scoreNode = goog.dom.createElement('span');
    scoreNode.classList.add(dotprod.views.ScoreboardView.SCORE_CLASS_NAME_);
    scoreNode.innerText = player.points_;

    var container = goog.dom.createElement('div');
    container.classList.add(player.isFriend(localPlayer) ? dotprod.views.ScoreboardView.FRIEND_CLASS_NAME_ : dotprod.views.ScoreboardView.FOE_CLASS_NAME_);
    container.appendChild(nameNode);
    container.appendChild(scoreNode);

    this.view_.appendChild(container);
  }
}