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
        x: monster.x + monster.width/2,
        y: monster.y + monster.height/2
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

  }