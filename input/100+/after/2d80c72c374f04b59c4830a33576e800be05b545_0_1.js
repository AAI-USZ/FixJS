function() {
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

  }