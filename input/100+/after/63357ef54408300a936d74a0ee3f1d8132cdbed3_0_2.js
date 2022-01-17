function(results) {
		for(i=0 ; i<results.length ; i++){
			
			var tags= new Array();
		    tags[0]=results[i].get('tag1');
		    tags[1]=results[i].get('tag2');
		    tags[2]=results[i].get('tag3');
		    var date= new Date(results[i].createdAt);
		    RequestList.push(new RequestTile(results[i].id,results[i].createdAt, results[i].get('by'),
								results[i].get('title1'),
								results[i].get('description'),
								results[i].get('likes'),
								tags,
								results[i].get('track'),
								results[i].get('track1'),
								results[i].get('track2'),
								results[i].get('track3'),
								results[i].get('track4')
								));
										
		alert("contents written:"+RequestList[i].id+
		RequestList[i].title+" "+
		RequestList[i].by+" "+
		RequestList[i].added+" "+
		RequestList[i].description+" "+
		RequestList[i].likes+" "+
		RequestList[i].track1+" "+
		RequestList[i].track2+" "+
		RequestList[i].track3+" ");
		
 
		}
		 
		render();
		
	
		}