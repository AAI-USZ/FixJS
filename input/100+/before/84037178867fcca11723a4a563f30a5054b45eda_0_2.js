function Character(){
    // Attributes
    this.name = 'Player_Name';
    this.speed = 3;
    this.clothes = ['robe_skirt', 'blonde_hair', 'white_shirt', 'leather_belt', 'leather_armor', 'brown_shoes'];
    this.weapon = 'dagger';
    this.attack = 'slash';
    this.damage = [150, 200]
    this.animation = 'walk';
    this.maxsx = 576;
    this.attacked = false;
    this.hp = [50, 200];
    this.mp = [10, 100];
    this.collidingmonsters = [];
    
    // Mapping info and state
    this.x = 320;
    this.y = 320;
    this.w = 64;
    this.h = 64;
    this.spriteOffset = {x: 0, y: 128};
    
    // Load sprites
    this.loadClothes();
}