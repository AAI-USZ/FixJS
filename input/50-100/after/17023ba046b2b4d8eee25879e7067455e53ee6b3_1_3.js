function(steps, units, strings){
		var n = +this
		  , i = 0
		  , s = strings || {"default":"{0} {1}"};
		
		while(n>steps[i])n/=steps[i++];
		i=units[i];
		return (n<2&&s[i+"s"]||s[i]||s["default"]).format(n|0, i);
	}