function(data) {							// If connection is successful . 
					    	console.log(data);
					    	main.data.allPosts.push(post); 
					    	$('.levelWrapper[level="0"]').html('');
					    	main.SingleDiscussion(currentDisc);
						    }