function surveyValidate(iden)// added iden as an input
{
	var j = 0;
	var error= false; 
	

	
	

	//var errmsg= ''; 
	//var error3= '<div id="error'+ iden +'" class="error"/>'	
	// $("displayQ").children("div").each(function(index) {
	//	errmsg += '<p> Please provide an answer to question ' + index + '</p>';
	// });

	var qdata = {};
	for(i=0; i <= 13; i++)
	{
	    //j += 1; 

	    var intermed= iden + '_agree_' + i ; // Used iden to fill in the pre-fix
	    qput= 'input[name = ' + intermed + ']:checked';
	    Q_input = $(qput).val();

	    var wrapper = "#displayQ-wrapper_" + iden;

	    //Q_input= $('input[name=pol_agree_+i]:checked').val(); 

	    if(Q_input == null)
		{
		    var errorid = '#err' + iden + i; 
		    error = true;
		    $(errorid).css('color','#F00'); 
		}
	    else
		{
		    qdata[iden + i] = Q_input;
		}
	}

	/*
	  if(error==true)
	  {
		$('#error'+ iden).html(errmsg); 
	  } 
	*/
	
	
	if(error==false || once == true)
	{   
	    twitid = $("#twitid").html();
	    $.post("core/DataWrangler.php", {"page":iden, "twitid":twitid, "data":qdata});
	    $(wrapper).hide(500); 
		once = false

	    if(iden=="party")
		{   
		    $("#politics_h").hide();
		    if(order==1)
			{   
			    $("#nationality_h").show();
			    $("#Nation-wrapper").show(500);
			}
		    else
			{   
			    $("#free_h").show();
			    $("#FreeForm-wrapper").show(500); 
			}
		}
	    if(iden=="nation")
		{   
		    $("#nationality_h").hide();
		    if(order==1)
			{   
			    $("#free_h").show();
			    $("#FreeForm-wrapper").show(500);
			} 
		    else
			{   
			    $("#politics_h").show();
			    $("#GetPol-wrapper").show(500);
			}
		}
	    if(iden=="own")
		{   
		    $("#free_h").hide();
			
			$("#feedback_h").show();
		    $("#GetFeedback-wrapper").show(500);
		    //window.location="ThankYou.php"; 
		}
	}
	
	else
	{ 
	    $('#error'+ iden).html('Oops. We noticed you left one or more items blank (shown in red above). Your responses are most useful to us when you answer every question, so we would appreciate it if you fill those in. But if you choose not to answer those specific items you can press "continue" to move on'); 
	once = true	 
	
	}
	
	
	

}