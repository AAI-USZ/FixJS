function addSuffix(name,suffix){
		return (name.substr(name.length-suffix.length).toLowerCase() === suffix)?
				name:name+"."+suffix;
	}