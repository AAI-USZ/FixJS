function(element, template){
    	
    	V.Debugging.log("enter to renderMcquestionLogged");
    	 		var next_num=0;
		
		var ret = "<div id='"+element['id']+"' class='multiplechoicequestion'>";
		
		ret += "<div class='mcquestion_container'>";
		ret += "<div class='mcquestion_left'><h2 class='question'>"+ element['question']+"?</h2>";
		
		ret += "<form class='mcquestion_form' action='"+element['posturl']+"' method='post'>";
		
		
		for(var i = 0; i<element['options'].length; i++){
			var next_num = i;
		var next_index = "a".charCodeAt(0) + (next_num); 
		next_index = String.fromCharCode(next_index);
			
			ret += "<label class='mc_answer'>"+next_index+") <input type='radio' name='mc_radio' value='"+next_index+"'>"+element['options'][i]+"</label>";
			ret += "<div class='mc_meter'><span style='width:33%;'></span></div>";
		
		}
		
		ret += "</div>";
		ret += "<div class='mcquestion_right'>";
		ret += "<img class='mch_statistics_icon' src='"+VISH.ImagesPath+"quiz/eye.png'/>";
		ret += "<input type='submit' class='mcquestion_send_vote_button' value='Send'/>";
		
		ret += "</div>";
		ret += "</form>";
		ret += "</div>";
		return ret;
    	
    	
    	
    }