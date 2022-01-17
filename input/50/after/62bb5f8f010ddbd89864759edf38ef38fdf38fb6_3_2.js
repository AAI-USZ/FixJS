function(packet) {
  var player = this.playerIndex_.findByName(packet[0]);
  var message = packet[1];

  this.chatView_.addMessage(player, message);
}