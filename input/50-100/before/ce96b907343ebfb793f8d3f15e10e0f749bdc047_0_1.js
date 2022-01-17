function()
		{
			var total = 0; var kills = 0;
			for(var i = 0; i < gco.level; i++)
			{
				total += this.objectives[i];
				kills += this.progress[i];
			}
			return (kills / total);
		}