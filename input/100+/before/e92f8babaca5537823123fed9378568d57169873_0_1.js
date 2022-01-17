function(p)
	{
		var id = this.getPartId(p);

		var index = this.get('interactions._count');
		this.partIndices[id] = index;

		var prepath = 'interactions.'+index+'.';

		this.set(prepath+'id',id);
		this.set(prepath+'objectives.0.id',this.getQuestionId(p.question));
		this.set(prepath+'weighting',p.marks);
		this.set(prepath+'result',0);
		this.set(prepath+'description',p.type);
		switch(p.type)
		{
		case '1_n_2':
		case 'm_n_2':
		case 'm_n_x':
			this.set(prepath+'type','choice');
			
			var pattern='';
			for(var i=0;i<p.settings.matrix.length;i++)
			{
				for(var j=0;j<p.settings.matrix[i].length;j++)
				{
					if(p.settings.matrix[i][j]>0)
					{
						if(pattern.length>0){pattern+='[,]';}
						pattern+=i+'-'+j;
					}
				}
			}
			this.set(prepath+'correct_responses.0.pattern',pattern);

			break;
		case 'numberentry':
			this.set(prepath+'type','numeric');
			this.set(prepath+'correct_responses.0.pattern',p.settings.minvalue+':'+p.settings.maxvalue);
			break;
		case 'patternmatch':
			this.set(prepath+'type','fill-in');
			this.set(prepath+'correct_responses.0.pattern','{case_matters='+p.settings.caseSensitive+'}{order_matters=false}'+p.settings.correctAnswer);
			break;
		case 'jme':
			this.set(prepath+'type','fill-in');
			this.set(prepath+'correct_responses.0.pattern','{case_matters=false}{order_matters=false}'+p.settings.correctAnswer);
			break;
		case 'gapfill':
			this.set(prepath+'type','other');

			for(var i=0;i<p.gaps.length;i++)
			{
				this.initPart(p.gaps[i]);
			}
			break;
		}

		for(var i=0;i<p.steps.length;i++)
		{
			this.initPart(p.steps[i]);
		}
	}