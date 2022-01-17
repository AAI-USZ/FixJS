function()
		{
			for(var i = 0; i < gco.level; i++)
			{//For each level, a new enemy type objective is placed on the mission stack.
				if(gco.level >= 6){ this.objectives.push(0); }
				else{ this.objectives.push(Math.floor(Math.random() * 25) + 35); }
				this.progress.push(0);
			}
		}