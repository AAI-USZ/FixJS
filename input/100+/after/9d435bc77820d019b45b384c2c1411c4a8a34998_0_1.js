function(results) {
		for(i=0 ; i<results.length ; i++){
			var tags= new Array();
			alert("inloop");
			tags[0]=results[i].get('tag1');
		    tags[1]=results[i].get('tag2');
		    tags[2]=results[i].get('tag3');
		    var date= new Date(results[i].get('createdAt'));
		    RequestList.push(new RequestTile(results[i].get('id'),
										 date,
										 results[i].get('by'),
										 results[i].get('title'),
										 results[i].get('description'),
										 results[i].get('likes'),
										 tags,
										 results[i].get('cover')));
		 }
		}