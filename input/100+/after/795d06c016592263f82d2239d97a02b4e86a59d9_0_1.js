function(thing,texArgs,settings) {
		var tex = texArgs[0];
		if( thing.args[0].tok.type=='op' )
		{
			var op = thing.args[0].tok.name;
			if(!(op=='/' || op=='*') && jme.precedence[op]>jme.precedence['-u'])	//brackets are needed if argument is an operation which would be evaluated after negation
			{
				tex='\\left ( '+tex+' \\right )';
			}
		}
		else if(thing.args[0].tok.type=='number' && thing.args[0].tok.value.complex) {
			var value = thing.args[0].tok.value;
			return settings.texNumber({complex:true,re:-value.re,im:-value.im});
		}
		return '-'+tex;
	}