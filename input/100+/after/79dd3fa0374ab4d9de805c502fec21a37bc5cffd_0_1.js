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
  }