function(messages) {
  for (var i = 0; i < this.monsters.length; i++) {
    var attacks = this.monsters[i].attack();
    for (var j = 0; j < attacks.length; j++) {
      messages.push({msg: attacks[j].message});
      this.player.hit(attacks[j]);
    }
  }
}