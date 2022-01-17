function()
    {
		var drawLaser = false;
		var x = 0, y = 0, h = 0, w = 0;
		buffer.beginPath();
        for(var i = 0; i < enemies.length; i++)
        {
			buffer.drawImage(enemyImages[enemies[i].Model], enemies[i].x - (enemies[i].width / 2), enemies[i].y - (enemies[i].height / 2), enemies[i].width, enemies[i].height);
			if(enemies[i].laser == true){ drawLaser = true; x = enemies[i].laserX; y = enemies[i].laserY; h = enemies[i].laserHeight; w = enemies[i].laserWidth; }
        }
		buffer.closePath();
		if(drawLaser){ this.drawBossLaser(x, y, w, h); }
    }