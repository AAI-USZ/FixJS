function() {

  Crafty.background("#EEE");

  /* round about walls */
  // top
  Crafty.e("2D, DOM, Color, platform, Collision").color("brown").attr({
    x: 0,
    y: 0,
    w: 1024,
    h: 10
  });
  // bottom
  Crafty.e("2D, DOM, Color, platform, Collision").color("brown").attr({
    x: 0,
    y: 758,
    w: 1024,
    h: 10
  });
  // right
  Crafty.e("2D, DOM, Color, solid, Collision").color("lime").attr({
    x: 1014,
    y: 0,
    w: 10,
    h: 768
  });
  // left
  Crafty.e("2D, DOM, Color, solid, Collision").color("lime").attr({
    x: 0,
    y: 0,
    w: 10,
    h: 768
  });


  Crafty.sprite(64, 64, "img/player1.png", {
    Player1: [0, 0]
  });

  // player
  Crafty.e("Player, 2D, DOM, Keyboard, Controls, Gravity, Collision, Player1, SpriteAnimation, Tween").attr({
    x: 100,
    y: 50,
    z: 1
  })
  .Controls(2, 12)
  .gravity("platform")
  .animate("RunRight", [
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [7, 0],
    [8, 0],
    [9, 0]
  ])
  .animate("RunLeft", [
    [2, 1],
    [3, 1],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [9, 1]
  ]).animate("StandRight", [
    [0, 0]
  ]).animate("StandLeft", [
    [0, 1]
  ])
  .bind("KeyDown", function(e) {
    //
  }).bind("KeyDown", function(e) {
    /*
      if (this.isDown("LEFT_ARROW")) { this._dir = true; }
      else if (this.isDown("RIGHT_ARROW")) { this._dir = false; }
    */

  }).bind("EnterFrame", function(frame) {
          this._dir = this._dir || false;

          if(this.isDown("DOWN_ARROW") && this._dir === false ) {
            if (!this.isPlaying("RunRight")) {
              this.stop().animate("RunRight", 20, -1);
            }
          } else if(this.isDown("DOWN_ARROW") && this._dir ) {
            if (!this.isPlaying("RunLeft")) {
              this.stop().animate("RunLeft", 20, -1);
            }
          } else{
            if(!this._dir) {
              if (!this.isPlaying("StandRight")) {
                this.stop().animate("StandRight", 60, 1);
              }
            } else if(this._dir) {
              if (!this.isPlaying("StandLeft")) {
                this.stop().animate("StandLeft", 60, 1);
              }
            }
          }

    /*
    if(this._up) {
      if(!this.isDown("RIGHT_ARROW") || !this.isDown("LEFT_ARROW")) {
        this.x = this._dir ? this._x - this._speed * 1.5 : this._x + this._speed * 1.5;
      }
    }
    */

    if (this.isDown("DOWN_ARROW")) {
      this.x = this._dir ? this._x - this._speed * 2 : this._x + this._speed * 2;
    }

    if (this.hit('solid')) {
      this._dir = !this._dir; // toggle direction
      this.x = this._dir ? this._x - 5 : this._x + 5;
    }

  });

  // brown = platform
  // lime = solid wall
  // red = player
  // blue = vert. elevator
  Crafty.e("2D, DOM, Color, platform, Collision").color("brown").attr({
    x: 700,
    y: 680,
    w: 400,
    h: 10
  });
  Crafty.e("2D, DOM, Color, roof, Collision").color("orange").attr({
    x: 700,
    y: 690,
    w: 400,
    h: 3
  });
  Crafty.e("2D, DOM, Color, platform, Collision").color("brown").attr({
    x: 800,
    y: 675,
    w: 100,
    h: 10
  });
  Crafty.e("2D, DOM, Color, Collision, velevator").color("blue").attr({
    x: 800,
    y: 675,
    w: 100,
    h: 1
  });



  Crafty.e("2D, DOM, Color, platform, Collision").color("brown").attr({
    x: 20,
    y: 675,
    w: 100,
    h: 10
  });

  // puntari vasemmalla tason päällä

  // taso olisi varmaan hyvä tehdä muuttujaksi komponenttivaiheessa
  Crafty.e("2D, DOM, Color, Collision").color("lime").attr({
    x: 20,
    y: 673,
    w: 100,
    h: 2
  }).onHit("Player", function (ent) {
    //

  }).bind('EnterFrame', function(frame) {

    // luo lava jos sitä ei vielä ole // lava joka liikkuu kun puntarin päällä ollaan
    this._lava = this._lava || Crafty.e("2D, DOM, Color, platform, Tween").color("lime").attr({ x: 300, y: 690, w: 50, h: 10 });
    this._lava._fall = this._lava._fall || false; // lava oletuksena aluksi ylospäin liikkuva

    if(this.hit("Player")) {

      if(frame.frame % 5 === 0) {

        if(this._lava._y < 300) {
          this._lava._fall = true; // down
        } else if(this._lava._y > 690) {
          this._lava._fall = false;
        }

        var move = this._lava._fall ? this._lava._y+5 : this._lava._y-5; // ylas tai alas
        // twiinataan niin menee siistimmin
        this._lava.tween({ y: move }, 5);
      }
    }
  });



  // tasoharpake oikealla tason päällä
  // taso olisi varmaan hyvä tehdä muuttujaksi komponenttivaiheessa
  Crafty.e("2D, DOM, Color, Collision, Tween, Keyboard").color("orange").attr({
    x: 200,
    y: 600,
    w: 80,
    h: 2
  }).onHit("Player", function (ent) {

    // twiinataan niin menee siistimmin
     if(!this.isDown("DOWN_ARROW")) {
        var player = ent[0].obj;
        //
        var move = this._lava._dir ? player._x+1 : player._x-1;
        //
        player.tween({ x: move }, 1);
     }

    //
    //
  }).bind('EnterFrame', function(frame) {

    // luo lava jos sitä ei vielä ole // lava joka liikkuu kun puntarin päällä ollaan
    this._lava = this._lava || Crafty.e("2D, DOM, Color, platform, Tween").color("red").attr({ x: 200, y: 602, w: 80, h: 10 });
    this._lava._dir = this._lava._dir || false; // lava oletuksena aluksi ylospäin liikkuva

    if(this.hit("Player")) {

      if(frame.frame % 5 === 0) {

        if(this._lava._x < 200) {
          this._lava._dir = true; // right
        } else if(this._lava._x > 690) {
          this._lava._dir = false;
        }

        var move = this._lava._dir ? this._lava._x+5 : this._lava._x-5; // vasemmalle tai oikealle
        // twiinataan niin menee siistimmin
        this.tween({ x: move }, 5);
        this._lava.tween({ x: move }, 5);

      }

    }
  });






}