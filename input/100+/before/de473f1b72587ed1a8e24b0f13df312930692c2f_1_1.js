function()
	{
		if(this.stagedAnswer==undefined)
		{
			this.setCredit(0,R('part.marking.did not answer'));
			return false;
		}
		this.ticks = util.copyarray(this.stagedAnswer);
		this.setCredit(0);

		this.numTicks = 0;
		var partScore = 0;
		var row,message;
		for( i=0; i<this.numAnswers; i++ )
		{
			for(var j=0; j<this.numChoices; j++ )
			{
				if(this.ticks[i][j])
				{
					partScore += this.settings.matrix[i][j];
					this.numTicks += 1;

					if((row = this.settings.distractors[i]) && (message=row[j]))
						this.addCredit(this.settings.matrix[i][j]/this.marks,message);
				}
			}
		}

		this.wrongNumber = (this.numTicks<this.settings.minAnswers || (this.numTicks>this.settings.maxAnswers && this.settings.maxAnswers>0));

		if(this.marks>0 && !this.wrongNumber)
		{
			this.setCredit(Math.min(partScore,this.marks)/this.marks);	//this part might have a maximum number of marks which is less then the sum of the marking matrix
		}
		else
			this.setCredit(0,R('part.mcq.wrong number of choices'));
	}