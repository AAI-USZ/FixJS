function(data)	{
		var condition, tuple, resultData = [];
		condition = Webbase.CriteriaStruct.where;
		condition = this.parseAndPrepareCondition(condition,this.checkTableAlreadyExists(Webbase.CriteriaStruct.from).field);
		for(var i = 0; i < data.length; i++)	{
			tuple = data[i];
			if(eval(condition) == false)	{
				resultData.push(tuple);
			}
		}

		this.updateData(Webbase.CriteriaStruct.from, resultData);
	}