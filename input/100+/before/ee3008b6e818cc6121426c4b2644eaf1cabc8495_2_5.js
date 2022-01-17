function(discID)	 			  // View for the Individual discussions. 
 {
	    var main = this;
	 	$('.levelWrapper[level="0"]').html('');

 		var i;
	 	for (i = 0; i < main.data.allDiscussions.length; i++){
	 		o = main.data.allDiscussions[i];
	 		if(o.dID == discID){
	 			$('#dTitleView').html(o.dTitle);
	 			$('#dIDhidden').val(o.dID);
	 			main.CurrentDiscussion = o.dID;	
	 			console.log("Curent Discussion ID: " + main.CurrentDiscussion);
	 			main.ListDiscussionPosts(o.dPosts);
	 		}
	 	
	 	}	 
}