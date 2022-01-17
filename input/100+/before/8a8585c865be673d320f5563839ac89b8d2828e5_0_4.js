function(posts)	 			  // View for the Individual discussions. 
 {
	 var main = this;

	 var discPosts = posts.split(",");
	 var i, j, p, d, typeText, authorID, message;
	 for(i = 1; i < discPosts.length; i++){							// Take one post at a time
		 p = discPosts[i];
		 for (j = 0; j < main.data.allPosts.length; j++){			// Go through all the posts
			 d = main.data.allPosts[j];			 
			 if(d.postID == p){										// Find the post we want to get the details of 
			 														// Prepare the data for display
				 authorID = main.getName(d.postAuthorId); 			// Get Authors name			
				 switch(d.postType)									// Get what kind of post this is 
					{
					case 'agree':
					  typeText = ' agreed';
					  break;
					case 'disagree':
					  typeText = ' disagreed';
					  break;
					case 'clarify':
					  typeText = ' asked to clarify';
					  break;
					case 'offTopic':
					  typeText = ' marked as off topic';
					  break;		  
					default:
					  typeText = ' commented';
					}
				 if(d.postMessage){									// Proper presentation of the message
					message = ' "' + d.postMessage + '".'; 
				 }
				 
				 console.log('author id: ' + authorID + ' - typetext: ' + typeText + ' - message: ' + message);	// Check to see if all is well
				 
				 var selector = 'div[level="'+ d.postFromId +'"]';	
				 $(selector).append(						// Add post data to the view
				 	  '<div class="threadText" level="'+ d.postID + '">' 
				 	+  '<span class="postAuthorView"> ' + authorID + '</span>'
				 	+  '<span class="postTypeView"> ' + typeText + '</span>'
				 	+  '<span class="postMessageView"> ' + message  + '</span>'
				 	+ ' <div class="sayBut2" postID="'+ d.postID + '">say</div>'	
				 	+ '</div>'
				 );
			 }	 
		 }
	 }
}