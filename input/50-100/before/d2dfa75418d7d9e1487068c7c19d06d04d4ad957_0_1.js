function(result) {
			var fields = new Object;
			var color = '#900';
			var lines = result.split('\n');
			
			for (var i = 0; i < lines.length; i++) {
				var line = lines[i].split(",");
				var name = line[0].trim();
				
				if (name.length > 0)
					fields[name] = line.slice(1);
			}
			
			addRun(color, fields);
		}