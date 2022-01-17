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
    this.hp = [0.5, 20];
    this.mp = [10, 100];
    this.collidingmonsters = [];
    
    // Mapping info and state
    this.initAsRect(320, 320, 64, 64);
    // sprite offset
    this.sx = 0;
    this.sy = 128;    
}