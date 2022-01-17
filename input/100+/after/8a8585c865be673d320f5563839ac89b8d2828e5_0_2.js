function addPostDisc(pID){
		// add post id to the relevant discussion section
		currentDisc = $('#dIDhidden').val();
		
		post.postID = pID; 
		
		var i;
	 	for (i = 0; i < main.data.allDiscussions.length; i++)
	 	{		
	 		var o = main.data.allDiscussions[i];
	 		if(o.dID === currentDisc ){
	
			 	if(o.dPosts){
				 	o.dPosts += ",";
			 	}
			 	o.dPosts += pID;

		 		
		 		$.ajax({												// Ajax talking to the saveDiscussions.php file												
					type: "POST",
					url: "scripts/php/saveDiscussions.php",
					data: {
						discussions: main.data.allDiscussions							// All discussion data is sent
													
					},
					  success: function(data) {							// If connection is successful . 
					    	console.log(data);
					    	main.data.allPosts.push(post); 
					    	$('.levelWrapper[level="0"]').html('');
					    	main.SingleDiscussion(currentDisc);
						    }, 
					  error: function() {					// If connection is not successful.  
							console.log("dscourse Log: the connection to saveDiscussions.php failed.");  
					  }
				});	
	

	 		}
	 	}
 	}