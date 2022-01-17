function()
    {
        if(Keys[17] == 1) // Escape
        {
			if(gameState == 1 && player.isAlive())
			{   if(!gco.win){ gco.TogglePauseGame(); }
				if(!paused){ currentGui = NULL_GUI_STATE;} else { currentGui = 1; }
			}
			
        }
        if(!paused)
        {
            if(Keys[4] == 1)
            {
				debug = !debug;
            }
			if(Keys[5] == 1 && gameState == 1)
			{
				if(playerInfo)
				{
					explosion = new Explosion(135, _canvas.height - 50, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
					explosion = new Explosion(135, _canvas.height - 30, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
					explosion = new Explosion(450, _canvas.height - 30, 75, 10, 100, 0.1, 3, 0.1);
                    explosions.push(explosion);
				}
				playerInfo = !playerInfo;
			}
            if(player.isAlive() && gameState == 1 && !gco.win)
            {
                if(Keys[0] >= 1) // W || Up
                {
                    player.y -= player.speed * delta;
                }
                if(Keys[1] >= 1) // A || Left
                {
                    player.x -= player.speed * delta;
                }
                if(Keys[2] >= 1) // S || Down
                {
                    player.y += player.speed * delta;
                }
                if(Keys[3] >= 1) // D || Right
                {
                    player.x += player.speed * delta;
                }

				if(ticks != player.onTick)
                {//On Tick Player Input
					player.onTick = ticks;
					if(Keys[16] >= 1) // Space
					{
						player.shoot();
					}
				}
				
                if(Keys[19] == 1) // B
                {
                    player.shootSecondary();
                }
            }
            else
            {
                if(Keys[18] == 1) // Enter
                {
                    //self.reset();
                }
            }
        }
    }