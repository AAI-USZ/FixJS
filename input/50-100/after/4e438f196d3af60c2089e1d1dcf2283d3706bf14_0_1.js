function Thanks()
{   
    finished = true;
	
    comments = $("#feedback").val();

    $.post("core/DataWrangler.php", {"page":"comments", "twitid":twitid, "comments":comments });
	
    $("#feedback_h").hide();
    $("#GetFeedback-wrapper").hide(500);

    $("#thanks").show(500); 
	
}