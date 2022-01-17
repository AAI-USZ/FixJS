function Character(){
    // Attributes
    this.name = 'Player_Name';
    this.speed = 3;
    this.clothes = ['robe_skirt', 'blonde_hair', 'white_shirt', 'leather_belt', 'leather_armor', 'brown_shoes'];
    this.weapon = 'bow';
    this.attack = 'shoot';
    this.animation = 'walk';
    this.maxsx = 576;
    this.attacked = false;
    
    // Mapping info and state
    this.position = {x: 320, y: 320};
    this.size = {w: 64, h: 64};
    this.spriteOffset = {x: 0, y: 128};
    
    // Load sprites
    this.loadClothes();
}