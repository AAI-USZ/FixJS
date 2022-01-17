function Thanks()
{   
    comments = $("#feedback").val();

    $.post("core/DataWrangler.php", {"page":"comments", "username":username, "comments":comments });
	
	$("#feedback_h").hide();
	$("#GetFeedback-wrapper").hide(500);
	
	$("#thanks").show(500); 
	
	
}