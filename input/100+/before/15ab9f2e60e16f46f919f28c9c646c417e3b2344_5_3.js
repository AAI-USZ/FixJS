function(string){
		return (typeof string == 'number' || (string && string == string * 1));
	}