function LevelMission()
	{
		//Enemy Types
		//0 = red: level 1
		//1 = yellow: level 2
		this.objectives = [];
		this.progress = [];
		
		this.GenerateObjectives = function()
		{
			for(var i = 0; i < gco.level; i++)
			{//For each level, a new enemy type objective is placed on the mission stack.
				this.objectives.push(Math.floor(Math.random() * 25) + 35);//between 25 and 60 enemies.
				this.progress.push(0);
			}
		}
		
		this.UpdateProgress = function(enType)
		{
			this.progress[enType] += 1;
		}
		
		this.CheckCompletion = function()
		{//returns true if level is complete, else returns false
			var completion = [];
			for(var i = 0; i < gco.level; i++)
			{
				if(this.progress[i] >= this.objectives[i])
				{
					//Awesome
				} else
				{
					return false;
				}
			}
			return true;
		}
		
		this.GetCompletionPercent = function()
		{
			var total = 0; var kills = 0;
			for(var i = 0; i < gco.level; i++)
			{
				total += this.objectives[i];
				if(this.progress[i] > this.objectives[i]){kills += this.objectives[i];} else { kills += this.progress[i]; }
			}
			return (kills / total);
		}
		
		this.ResetObjectives = function()
		{
			this.objectives = [];
			this.progress = [];
			this.GenerateObjectives();
		}
	}