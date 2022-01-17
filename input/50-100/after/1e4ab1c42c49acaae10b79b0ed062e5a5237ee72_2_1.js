function(string) {
			console.log(string);
			return string.replace(/<div><br><\/div>/gi, '<br>');
		}