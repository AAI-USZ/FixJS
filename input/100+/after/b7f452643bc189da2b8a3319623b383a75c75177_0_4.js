function FreeCheck()
{ 
    nform1 = $("#free1").val();
    nform2 = $("#free2").val();
    userURL = $("#user_url").val();
    errmsg='';

    //alert(nform1 + ", " + nform2 + ", " + validURL(userURL));
	
    //nform1 = capitalize(nform1) 
    //nform2 = capitalize(nform2)
	
    //nform1 = nform1.charAt(0).toUpperCase() + nform1.slice(1);
    //nform2 = nform2.charAt(0).toUpperCase() + nform1.slice(1); 
    
    error = false;
	

    if(nform1.length < 3)
	{ 
	    error = true;
	    errmsg += '<p> Please provide an appropriate answer to item 1 </p>';
	    
	    //$("#freeq1").addClass("error")
	    $("#freeq1").css('color','red');
	    
	}// add more to this later
	else
	{
		$("#freeq1").css('color','black');
		
	} 

    if(nform2.length < 3)
	{ 
	    error = true;
	    errmsg += '<p> Please provide an appropriate answer to item 2 </p>';
	    //$("#freeq2").addClass("error")
	    $("#freeq2").css('color','red');
	}
	else
	{
		$("#freeq2").css('color','black');
		
	} 
    if(!validURL(userURL))
	{ 
	    error = true;
	    errmsg += '<p> Please provide a valid URL </p>';
	    //$("#freeq2").addClass("error")
	    $("#freeq3").css('color','red');
	}  
	else
	{
		$("#freeq3").css('color','black');
		
	} 
	
	  if(error== false)
	{   once = false
	    twitid = $("#twitid").html();
	    $.post("core/DataWrangler.php", {"page":"freeform", "twitid":twitid, "data":{"ownform1":nform1,"ownform2":nform2, "ownURL":userURL} });
	    $("#FreeForm-wrapper").hide(500);
	    displayQ(nform1,nform2,"own");
	}  
    else
	{
	    $("#error-5").html(errmsg);
		
	}
  
}