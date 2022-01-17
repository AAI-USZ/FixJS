function checkDemographics()
{
    gender = $("input[name=gender]:checked").val();
    age = $("#age option:selected").val();
    loc = $("#sel_country option:selected").val();
    races = [];
    $("input[name=race]:checked").each(function() { races.push($(this).val()); });
    income = $("#income option:selected").val();
    education = $("#edu option:selected").val();

    // alert(income+"\n"+parseFloat(income)+"\n");
    // $.get('getLocation.php', 
    //         { 'q': loc},
    //         function(data) {
    //             alert(data);
    //         });

    // Do validation of input
    var error = false;
    var errmsg = "";
	//$("li").addClass("black");

    if(gender==null)
	{
	    error=true;
	    //errmsg += "<div class='error'>Please choose an option for gender</div>";
		//$("#genderq").addClass("error");
		$("#genderq").css('color','red');
		
	} 
	
	   
    if(age=="unselected")
	{
	    error=true;
	    //errmsg += "<div class='error'>Please state the year you were born</div>";
		$("#ageq").addClass("error");
	}
	
		
	
    if(loc == "unselected")
	{
	    error=true;
	    //errmsg += "<div class='error'>Please indicate your current location</div>";
		$("#locationq").addClass("error");
	}
	
    if(races.length==0)
	{
	    error=true;
	    errmsg += "<div class='error'>Please indicate your ethnicity</div>";
		$("#ethnicityq").addClass("error");
	}
	
    if(income=="unselected" || $.trim(income) != income.replace(/[^0-9$.,]/g,'') || !IsNumeric(income.replace(/[^0-9.]/g,'')))
	{
	    error=true;
	    //errmsg += "<div class='error'>Please enter a valid number for income</div>";
		$("#incomeq").addClass("error");
	}
	
    if(education=="unselected")
	{
	    error=true;
	    errmsg += "<div class='error'>Please indicate your highest level of education</div>";
		$("#educationq").addClass("error")
	}
	
    // Output error message if input not valid
    if(error==false || once == true)
	{
	    username = $("#username").html();
	    $.post("core/DataWrangler.php", {"page":"demog", "username":username, "data":{"gender":gender,"age":age,"loc":loc,"races":races,"income":income,"edu":education} });
	    $("#demographics_h").hide();
	    $("#demo-wrapper").hide(500);
	    DecideOrder(loc);
		once = false


	}
    else
	{
	    $('#error-1').html('Oops. We noticed you left one or more items blank (shown in red above). Your responses are most useful to us when you answer every question, so we would appreciate it if you fill those in. But if you choose not to answer those specific items you can press "Submit" to move on.');
		once = true
	}
	
}