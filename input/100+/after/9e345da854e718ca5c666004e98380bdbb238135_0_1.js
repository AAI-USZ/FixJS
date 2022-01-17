function(obj, base)
	{
		obj || (obj = {});
		base || (base = null);
		if(obj.initialize && !Composer.suppress_warnings)
		{
			var str	=	'You are creating a Composer object with an "initialize" method/' +
						'parameter, which is reserved. Unless you know what you\'re doing ' +
						'(and call this.parent.apply(this, arguments)), please rename ' +
						'your parameter to something other than "initialize"! Perhaps you' +
						'were thinking of init()?';
			console.log('----------WARNING----------');
			console.log(str);
			console.log('---------------------------');
		}

		if(obj.extend && !Composer.suppress_warnings)
		{
			var str	=	'You are creating a Composer object with an "extend" method/' +
						'parameter, which is reserved. Unless you know what you\'re doing ' +
						'(and call this.parent.apply(this, arguments)), please rename ' +
						'your parameter to something other than "extend"!';
			console.log('----------WARNING----------');
			console.log(str);
			console.log('---------------------------');
		}

		return obj;
	}