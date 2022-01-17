function(packet) {
  var player = this.playerIndex_.findByName(packet[0]);
  var message = packet[1];

  this.chat_.addMessage(player, message);
}