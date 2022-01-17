function CheckNationID()
{ 
    // take list of nations, split into array
    nation_list = $("#national").val().replace(/,+$/,'').split(',');
    nform1 = nation_list.join('-');
    
    n_end = nform1.slice(-1);
    n_ese= nform1.slice(-3);
    //n_ch= nform1.slice(-2);
	
	//("li").addClass("black")
	
    if(n_end == "s" || n_end == "x" || n_end == "z" || n_end =="h" || n_ese == "ese")
	{
	    nform2=nform1;
	}
	else 
	{
	    nform2 = nform1 + "s";
	}
	
    // create array of exceptions to 's' rule
    // check if last nation is exception
    // nform2 = nform1 + "s";
    errmsg='';

    var error = false;

    for( nation in nation_list )
	{
	    if($.inArray(nation_list[nation],nationalities)==-1)
		{
		    error = true;
		    errmsg += '<p class="error"> Oops. Please type your nationality to proceed.</p>'
		    $("#nationalityq").css('color','red'); 
		}
	}


	 if(error == false)
		{
			
			once = false
			username = $("#username").html();
			$.post("core/DataWrangler.php", {"page":"natform", "username":username, "nationality":nform1 });
			$("#Nation-wrapper").hide(500);
			displayQ(nform1,nform2,"nation");
			
		}
	
    else
	{   $("#nationalityq").css('color','red'); 
		$("#error-4").html(errmsg);
		once = true
		
	} 
    
}