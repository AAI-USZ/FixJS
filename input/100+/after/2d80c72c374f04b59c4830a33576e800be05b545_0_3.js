function(sylvester, $) {

  var hasTwitterImages = false;

  // Setup requestAnimationFrame
  requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  function checkCollision( obj1, obj2 ) {
    var top1, top2,
      bottom1, bottom2,
      left1, left2,
      right1, right2;

    top1 = obj1.y + obj1.aabb.hy;
    top2 = obj2.y + obj2.aabb.hy;
    bottom1 = obj1.y - obj1.aabb.hy;
    bottom2 = obj2.y - obj2.aabb.hy;
    left1 = obj1.x - obj1.aabb.hx;
    left2 = obj2.x - obj2.aabb.hx;
    right1 = obj1.x + obj1.aabb.hx;
    right2 = obj2.x + obj2.aabb.hx;

    var outsideBottom = bottom1 > top2,
      outsideTop = top1 < bottom2,
      outsideLeft = left1 > right2,
      outsideRight = right1 < left2;

    return !( outsideBottom || outsideTop || outsideLeft || outsideRight );
  }

  // Create the canvas
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);

  // Global font properties
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  function LoadableImage(imageUrl)
  {
    this.image = new Image();
    this.image.onload = this.onload.bind(this);
    this.image.src = imageUrl;
  }
  LoadableImage.prototype = {
    ready: false,
    onload: function(){this.ready = true}
  };

  var bgImage = new LoadableImage("img/background.png");
  var heroImage = new LoadableImage("img/hero.png");
  var monsterImage = new LoadableImage("img/monster.png");
  var twitterImages = [];
  var bulletImage = new LoadableImage("img/bullet1.png");

  // search for recent tweets with our keyword
  var keyword = "mozilla";

  $.getJSON("http://search.twitter.com/search.json?q=" + keyword +
    "&result_type=mixed"+"&callback=?",
    {},
    function(data){
      $.each(data.results, function(index, val) {
        var twitterImage = new LoadableImage(val.profile_image_url);
        twitterImage.image.onload = function(){
          hasTwitterImages = true;
          this.ready = true;
        }.bind(twitterImage);
        twitterImages.push(twitterImage);
        console.log(val.profile_image_url);
      });
    });

  // Game objects
  var hero = {
    speed : 256, // movement in pixels per second
    aabb: {
      hx: 16,
      hy: 16
    }
  };
  var monster = {
    aabb: {
      hx: 15,
      hy: 16
    }
  };
  var monstersCaught = 0;
  var isDead = false;

  // mouse clicks fire bullets
  var clickedLocations = [];
  var bulletList = [];

  // Handle keyboard controls
  var keysDown = {};

  addEventListener("keydown", function(e) {
    if(isDead && e.keyCode == ENTER) {
      restart();
    }
    else {
      keysDown[e.keyCode] = true;
    }
  }, false);

  addEventListener("keyup", function(e) {
    delete keysDown[e.keyCode];
  }, false);

  canvas.addEventListener("click", function (e) {
    clickedLocations.push({
      x: e.clientX,
      y: e.clientY,
      time: e.timeStamp
    });
  }, false);

  var ENTER = 13;
  var UP = 87; // W
  var DOWN = 83; // A
  var LEFT = 65; // S
  var RIGHT = 68; // D

  // Reset the game when the player catches a monster
  var reset = function() {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
    if (hasTwitterImages){
      var validMonsterImages = $.grep(twitterImages, function(element, index)
      {
        return element.ready;
      });
      monsterImage = validMonsterImages[Math.floor(Math.random() *
                                        validMonsterImages.length)];
      monster.aabb.hx = Math.floor(monsterImage.image.width / 2);
      monster.aabb.hy = Math.floor(monsterImage.image.height / 2);
    }

    bulletList = [];
    clickedLocations = [];

    // set up the font for the score    
    ctx.font = "24px Helvetica";
    ctx.fillStyle = "rgb(250, 250, 250)";

  };

  // Add a bullet, which just a hash of options
  function addBullet(bullet) {
    bullet.aabb = { hx: 8, hy: 8 };
    bullet.directionVector =
      bullet.directionVector.toUnitVector().multiply(bullet.speedPPS);
    bulletList.push(bullet);
  }

  function checkBoundaries(obj) {
    if (obj.x < 0) {
      obj.x = 0;
    } else if (obj.x > canvas.width - obj.width) {
      obj.x = canvas.width - obj.width;
    }

    if (obj.y < 0) {
      obj.y = 0;
    } else if (obj.y > canvas.height - obj.height) {
      obj.y = canvas.height - obj.height;
    }
  }

  function renderDeath() {
    // For some reason, need to do this else the font isn't aliased
    ctx.drawImage(bgImage.image, 0, 0);

    ctx.font = "52px Helvetica";
    ctx.fillStyle = "rgb(75, 0, 0)";
    ctx.fillText("You Died", 150, 128);

    ctx.font = "32px Helvetica";
    ctx.fillStyle = "rgb(100, 25, 25)";
    ctx.fillText("But you caught " + monstersCaught + " goblins!",
      80, 200);

    ctx.font = "20px Helvetica";
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillText("Hit enter to restart", 170, canvas.height - 100);
  }

  // Update game objects
  function update(modifier) {
    var currentMouseEvent;

    //Handle the list of mouse events
    while(clickedLocations.length > 0) {
      currentMouseEvent = clickedLocations.pop();
      addBullet({
        speedPPS: 200,
        directionVector: Vector.create([currentMouseEvent.x - hero.x,
          currentMouseEvent.y - hero.y]),
        x: hero.x,
        y: hero.y,
        fromHero: true
      });
    }

    var heroMoveAmount = {x: 0, y: 0};
    if (UP in keysDown) {// Player holding up
      heroMoveAmount.y -= hero.speed * modifier;
    }
    if (DOWN in keysDown) {// Player holding down
      heroMoveAmount.y += hero.speed * modifier;
    }
    if (LEFT in keysDown) {// Player holding left
      heroMoveAmount.x -= hero.speed * modifier;
    }
    if (RIGHT in keysDown) {// Player holding right
      heroMoveAmount.x += hero.speed * modifier;
    }
    // This prevents the hero from moving faster diagonally than they can otherwise
    var maxMoveAmount = hero.speed * modifier;
    var actualMoveAmount = Math.sqrt(heroMoveAmount.x * heroMoveAmount.x + heroMoveAmount.y * heroMoveAmount.y);
    if (actualMoveAmount > maxMoveAmount){
      heroMoveAmount.x *= (maxMoveAmount/actualMoveAmount);
      heroMoveAmount.y *= (maxMoveAmount/actualMoveAmount);
    }

    hero.x += heroMoveAmount.x;
    hero.y += heroMoveAmount.y;

    var i, currentBullet;
    for (i = 0; i < bulletList.length; ++ i) {
      currentBullet = bulletList[i];
      currentBullet.x += (currentBullet.directionVector.elements[0] * modifier);
      currentBullet.y += (currentBullet.directionVector.elements[1] * modifier);
      if (currentBullet.x < 0 || currentBullet.x > canvas.width ||
        currentBullet.y < 0 || currentBullet.y > canvas.height) {
        // this bullet is offscreen, ditch it
        bulletList.splice(i, 1);
      }
      if (currentBullet.fromHero) {
        if(checkCollision(monster, currentBullet)) {
          monstersCaught++;
          reset();
        }
      }
      else if(checkCollision(hero, currentBullet)) {
        isDead = true;
      }
    }

    // The player dies when moving off the left side of the screen,
    // this is just temporary until we get bullets
    if (hero.x < 0) {
      isDead = true;
    }

    // Make the enemy move a little bit
    if(Math.random() < .3) {
      var rand = Math.random();
      var dist = 10;

      if(rand < .1) {
        monster.x += dist;
      }
      else if(rand < .2) {
        monster.x -= dist;
      }
      else if(rand < .3) {
        monster.y += dist;
      }
      else if(rand < .4) {
        monster.y -= dist;
      }
    }

    // Constrain the hero and monster to the screen
    checkBoundaries(hero);
    checkBoundaries(monster);

    // Make the enemy shoot bullets randomly
    if(Math.random() < .05) {
      addBullet({
        speedPPS: 150,
        directionVector: Vector.create([Math.random()*2-1,
          Math.random()*2-1]),
        x: monster.x,
        y: monster.y
      });
    }

    // Are they touching?
    if (hero.x <= (monster.x + 32) &&
      monster.x <= (hero.x + 32) &&
      hero.y <= (monster.y + 32) &&
      monster.y <= (hero.y + 32)) {

      monstersCaught++;
      reset();
    }

  };

  // Draw everything
  function render() {
    if (bgImage.ready) {
      ctx.drawImage(bgImage.image, 0, 0);
    }

    if (heroImage.ready) {
      ctx.drawImage(heroImage.image, hero.x - heroImage.image.width/2, hero.y - heroImage.image.height/2);
    }

    if (monsterImage.ready) {
      ctx.drawImage(monsterImage.image, monster.x - monsterImage.image.width/2, monster.y - monsterImage.image.height/2);
    }

    var i, l, currentBullet;
    for (i = 0, l = bulletList.length; i < l; ++ i){
      currentBullet = bulletList[i];
      if (bulletImage.ready) {
        ctx.drawImage(bulletImage.image,
          currentBullet.x - bulletImage.image.width/2,
          currentBullet.y - bulletImage.image.height/2);
      }
    }

    // Score
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
  };

  // The main game loop
  function main() {
    var now = Date.now();
    var delta = now - then;

    if(!isDead) {
      update(delta / 1000);
      render();

      then = now;
      requestAnimationFrame(main);
    }
    else {
      renderDeath();
    }
  };

  // Let's play this game!
  var then;
  function restart() {
    isDead = false;
    monstersCaught = 0;

    reset();
    then = Date.now();
    main();
  }
  restart();
}