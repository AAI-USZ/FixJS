function checkPolitics()
{
	party =$("#affiliation option:selected").val();

	var error = false;
	var errmsg= "";
	

	if(party == "unselected")
	{ 
	    error=true;
	    errmsg += "<div class='error'>Please indicate the political party you most identify with</div>";
	    $('#error-2').html(errmsg);
	    $("#GetPol-wrapper").addClass("error"); 
	}
	else
	{ 
	    if(party=="democrat")
		{ 
		    var pform1="Democrat";
		    var pform2="Democrats";
		}
	    if(party=="republican")
		{ 
		    var pform1="Republican";
		    var pform2="Republicans";
		}
	    if(party=="constitution")
		{ 
		    var pform1="Constitution Party member";
		    var pform2="Constitution Party members";
		}
	    if(party=="green")
		{ 
		    var pform1="Green Party member";
		    var pform2="Green Party members";
		}
	    if(party=="libertarian")
		{
		    var pform1="Libertarian";
		    var pform2="Libertarians";
		}
	    username = $("#username").html();
	    $("#GetPol-wrapper").hide(500); 
	    displayQ(pform1, pform2, "party");
	    $.post("core/DataWrangler.php", {"page":"polform", "username":username, "party":party });
	}
}