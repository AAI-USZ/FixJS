function(line){
		lineArray = [];
		line.split('\t').forEach(function(tabChunk){
			commaSep = tabChunk.split(",");
			for (var i=0; i<commaSep.length; i++)
				lineArray.push($.trim(commaSep[i]));
		});
		
		cells.push(lineArray);
	}