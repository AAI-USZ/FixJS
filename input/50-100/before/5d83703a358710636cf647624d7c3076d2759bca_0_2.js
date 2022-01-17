function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index == -1) return;
				var str = dataString.substring(index+this.versionSearchString.length+1).split(' ', 1).pop();
				return str.split('.', 2).join('.');
			}