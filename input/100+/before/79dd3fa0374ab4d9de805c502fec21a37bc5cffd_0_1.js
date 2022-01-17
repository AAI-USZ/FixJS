function render() {
    if (bgImage.ready) {
      ctx.drawImage(bgImage.image, 0, 0);
    }

    if (heroImage.ready) {
      ctx.drawImage(heroImage.image, hero.x, hero.y);
    }

    if (monsterImage.ready) {
      ctx.drawImage(monsterImage.image, monster.x, monster.y);
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