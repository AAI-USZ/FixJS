function(id) {
		
		var add_option_button = "<a id='"+buttonAddOptionId+"' class='add_quiz_option'><img src='images/add_quiz_option.png' id='add_quiz_option_img'/></a>";
	 	
	 	//remove children's li selected (id) except index a), b), etc ...  
		$("#li_mch_option_"+id.toString()).children().remove();
		//all the inputs in the Multiple Choice Quiz
		//var num_inputs = $(".current").find("."+MultipleChoiceOptionClass).size();
		
		//testing
		var num_inputs = $(".current").find(".li_mch_option").size();
		
		var i;
		var next_index;
		
		//when the option clicked to remove is diferent from the last one 
		
		
		//if id less than number of inputs
		if(id < (num_options) ) {
			
			//OJO con el igual
		for (i=id; i<=num_inputs; i++) {
			
			next_index = "a".charCodeAt(0)+ i; 
			next_index = String.fromCharCode(next_index);
			
			//change the id of inputs (decrease one number) the next one will be the deleted
			$(".current").find("li#li_mch_option_"+(i+1).toString()+"> input").attr('id', "radio_text_"+i.toString());//.attr(id, "radio_text_"+i.toString());
			
			//change the href to the next elements (even the last one ?) 
					
			$(".current").find("li#li_mch_option_"+(i+1).toString()+"> a").attr('href', "javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+i.toString()+")");
			
			//move children up 
			
			$("#li_mch_option_"+i.toString()).append($("#li_mch_option_"+(i+1).toString()).children());
			
			//TODO ask Kike how to do this better....
			if (i==(num_inputs)){ 
				//for the last one the icon is for adding and input element , so remove whatever 
				//there was add the add option button 
				$(".current").find("#li_mch_option_"+(i-1).toString()+" > a").remove();
				$(".current").find("#li_mch_option_"+(i-1).toString()).append(add_option_button);
				
			}
			
		     
		}
		//remove the last index 
		$(".current").find("#li_mch_option_"+(num_inputs).toString()).remove();
		//add new counter to add option 

		}
		//if the selected input to remove is the last one of all options
		
		// id=6 
		else if (id == (num_options) ) {
			//remove the last input
			 $(".current").find("#li_mch_option_"+id.toString()).remove();
			
			
			//remove the delete icon from the preview input
			$(".current").find("li#li_mch_option_"+(id-1).toString()+" > #a_remove_quiz_option").remove();
			
			//add the add icon to the preview input 
			$(".current").find("#li_mch_option_"+(id-1).toString()).append(add_option_button);
			
		}
		
		else {
			
			VISH.Debugging.log("Error executing VISH.Editor.Quiz.removeMultipleChoiceOption function with parameter: " + id);
			
		}
	}