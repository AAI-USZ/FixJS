function addSubredditContainer(category) {
	var subredditContainer = $('<div/>',{ class:"well" });
	var rowOfComponents = $('<div/>',{ class:"row" }).appendTo(subredditContainer);
	var title =  $('<h3/>',{ 
		class:"subreddittag pull-left",
		text:category
		}).appendTo(rowOfComponents);
	var slider =  $('<div/>',{ 
		class:"slider",
		id:category,
		}).appendTo(rowOfComponents);
	var button =  $('<div/>',{ 
		class:"btn btn-danger pull-right",
		}).appendTo(rowOfComponents).append($('<dev/>',{class:'icon-remove icon-white'}));

	subredditContainer.hide();
	$('#subreddit-container-list').prepend(subredditContainer);
	subredditContainer.show(1000);
	
}