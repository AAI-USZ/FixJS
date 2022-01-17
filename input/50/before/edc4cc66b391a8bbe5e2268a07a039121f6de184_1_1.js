function addSuffix(name,suffix){
		return (name.toUpperCase().substr(name.length-suffix.length) === suffix)?
				name:name+"."+suffix;
	}