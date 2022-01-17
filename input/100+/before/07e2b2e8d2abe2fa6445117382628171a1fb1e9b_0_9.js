function()
    {
        buffer.clearRect(0, 0, _buffer.width, _buffer.height);
        canvas.clearRect(0, 0, _canvas.width, _canvas.height);
    
        //Draw Code
        var x = _buffer.width / 2;
        var y = _buffer.height / 2;
        var width = 25;
        var height = 35;

        // Background
        buffer.fillStyle = "rgb(0, 0, 0)";
        buffer.fillRect(0, 0, _buffer.width, _buffer.height);
        
		// Stars
        self.drawStars();
		
        if(gameState == 1)
        {
			//Money
			self.drawMoney();
			
			//Random Items
			self.drawItems();
			
            // Player
            if(player.isAlive())
            {
                self.drawPlayer();
                if(player.hasShield && player.shield > 0)
                {
                    self.drawShield();
                }
            }

            //Enemies
            self.drawEnemies();
            
            // Missile
            self.drawMissiles();

			//Laser
			if(player.laser){ self.drawLaser(); }
			
            // Explosion
            self.drawExplosions();
            
            // GUI
            self.drawHUD();
        }
		self.drawGUI();
        canvas.drawImage(_buffer, 0, 0);
    }