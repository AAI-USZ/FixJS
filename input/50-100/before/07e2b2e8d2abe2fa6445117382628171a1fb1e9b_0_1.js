function()
		{
			for(var i = 0; i < gco.level; i++)
			{//For each level, a new enemy type objective is placed on the mission stack.
				this.objectives.push(Math.floor(Math.random() * 25) + 35);//between 25 and 60 enemies.
				this.progress.push(0);
			}
		}