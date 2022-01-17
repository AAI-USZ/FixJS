function (msg) {
  this.network.say(this.name, this.config.colors ?
    msg : msg.replace(/[\x02\x1f\x16\x0f]|\x03\d{0,2}(?:,\d{0,2})?/g, ''));
}