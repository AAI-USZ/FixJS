function(){
	
		 var main = this;


	// Get post values from the form.
		// postID -- postFromId
		var postFromId = $('#postIDhidden').val();	
		console.log('Post id : ' + postFromId);
		
		// author ID -- postAuthorId -- this is the session user
		var postAuthorId = $('#userIDhidden').val();	
		console.log('Author Id : ' + postAuthorId);
		
		// message -- postMessage
		var postMessage = $('#text').val();	
		console.log('Post id : ' + postMessage);

		// type -- postType
		var postType = 'comment';	
		var formVal = $('input[type=radio]:checked').val();
		
		if(formVal !== undefined){
			postType = formVal;
		} 
		console.log('Post id : ' + postType);
	
	// Create post object and append it to allPosts
	
			post = {
				'postFromId': postFromId,
				'postAuthorId': postAuthorId,
				'postMessage': postMessage,
				'postType': postType,
			};
	
	// run Ajax to save the post object
	
	$.ajax({																						
			type: "POST",
			url: "scripts/php/posts.php",
			data: {
				post: post,							
				action: 'addPost'							
			},
			  success: function(data) {						// If connection is successful . 
			    	  console.log(data);
			    	  addPostDisc(data);
			    	  
			    }, 
			  error: function() {					// If connection is not successful.  
					console.log("Dscourse Log: the connection to posts.php failed.");  
			  }
		});	
	
	function addPostDisc(pID){
		// add post id to the relevant discussion section
		var currentDisc = $('#dIDhidden').val();
		
		var i;
	 	for (i = 0; i < main.data.allDiscussions.length; i++)
	 	{		
	 		var o = main.data.allDiscussions[i];
	 		if(o.dID === currentDisc ){
		 		var discPosts = o.dPosts.split(",");
		 		discPosts.push(pID); 
		 		discPostList = discPosts.toString(); 
		 		o.dPosts = discPostList;
		 		
		 		$.ajax({												// Ajax talking to the saveDiscussions.php file												
					type: "POST",
					url: "scripts/php/saveDiscussions.php",
					data: {
						discussions: main.data.allDiscussions							// All discussion data is sent
													
					},
					  success: function(data) {							// If connection is successful . 
					    	console.log(data);					    }, 
					  error: function() {					// If connection is not successful.  
							console.log("dscourse Log: the connection to saveDiscussions.php failed.");  
					  }
				});	
	

	 		}
	 	}
	 	main.SingleDiscussion(pID);
 	}
	
	// run Ajax to update that specific discussion
		
}