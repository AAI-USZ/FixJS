function(string, delim) {
	var lines = string.split('\n');
	if (lines.length <= 0) {
		return;
	}
	this.titles = lines[0].split(delim);
	if (lines.length > 1) {
		for (var r = 1; r < lines.length ; r++) {
			if ( lines[r] == "" ) continue;
			
			var lineArray = lines[r].split(delim);
			var lineData =  [];
			for (var c = 0; c < lineArray.length ; c++) {
				if (this.compress && lineArray[c] == "") continue;
				lineData.push(lineArray[c]);
			}
			this.data.push(lineData);
		}
	}
}