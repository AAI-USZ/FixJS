function(thing,texArgs) {
		var tex = texArgs[0];
		if( thing.args[0].tok.type=='op' )
		{
			var op = thing.args[0].tok.name;
			if(!(op=='/' || op=='*') && jme.precedence[op]>jme.precedence['-u'])	//brackets are needed if argument is an operation which would be evaluated after negation
			{
				tex='\\left ( '+tex+' \\right )';
			}
		}
		return '-'+tex;
	}