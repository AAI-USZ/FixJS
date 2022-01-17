function() {
  var self = this;
  this._churns.sort();

  function stopStart(index) {
    var oldBot, newBot;
    oldBot = self._nodes[index];
    oldBot.stop();
    newBot = new Bot(self._botConfig(index, 0));
    newBot.start();
    self._nodes[index] = newBot;
    var interval = self._churns[Math.floor(Math.random() * self._churns.length)] + Math.floor(Math.random() * 55 * 1000);
    setTimeout(stopStart, interval, index);
  }

  var churnMax = 2 * this._churns[Math.floor(this._churns.length / 2)];
  for (var i = this._nodes.length - 1; i >= 0; i--) {
    setTimeout(stopStart, Math.floor(Math.random() * churnMax), i);
  }
}