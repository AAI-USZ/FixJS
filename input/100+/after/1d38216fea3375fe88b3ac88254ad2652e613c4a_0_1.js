function addSubredditContainer(category) {
	var subredditContainer = $('<div/>',{ 
		class:"well subreddit-row"
	}).css('height','20px');
	var rowOfComponents = $('<div/>').appendTo(subredditContainer);
	var title =  $('<h3/>',{ 
		class:"subreddittag",
		text:category
		}).appendTo(rowOfComponents);
	var slider =  $('<div/>',{ 
		class:"slider",
		id:category,
		}).appendTo(rowOfComponents);
	var button =  $('<div/>',{ 
		class:"btn btn-danger remove-btn",
		})
		.appendTo(rowOfComponents)
		.append($('<dev/>',{class:'icon-remove icon-white'}));

	subredditContainer.hide();
	$('#subreddit-container-list').prepend(subredditContainer);
	subredditContainer.slideDown("slow");

	button.click(function() {
		subredditContainer.hide();
		removeSubreddit(category);
	});
}