function(num) {
  var monsterConstructors = [OrcMonster, HydraMonster, SlimeMoldMonster, BrigandMonster];
  this.monsters = [];
  for (var i = 0; i < num; i++) {
    this.monsters.push(new monsterConstructors[randomInteger(monsterConstructors.length)-1]());
  }
}