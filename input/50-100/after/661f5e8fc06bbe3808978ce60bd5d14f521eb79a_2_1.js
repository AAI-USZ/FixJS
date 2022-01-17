function(units) {
		
			if(this == 0) return 0;
			
			var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'], e = Math.floor(Math.log(this) / Math.log(1024));

			return (this / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + (units && units[e] ? units[e] : s[e]);
		}