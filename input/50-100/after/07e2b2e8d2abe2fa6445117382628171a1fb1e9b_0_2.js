function()
		{//returns true if level is complete, else returns false
			if(gco.level < 6)
			{
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
			} else
			{
				return false;
			}
		}