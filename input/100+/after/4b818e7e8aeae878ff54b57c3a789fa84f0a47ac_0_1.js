function(messages) {
  for (var i = 0; i < this.monsters.length; i++) {
    if (!this.monsters[i].isDead()) {
      var attacks = this.monsters[i].attack(this.player);
      for (var j = 0; j < attacks.length; j++) {
        messages.push({msg: attacks[j].message});
        this.player.hit(attacks[j]);
      }
    }
  }
}