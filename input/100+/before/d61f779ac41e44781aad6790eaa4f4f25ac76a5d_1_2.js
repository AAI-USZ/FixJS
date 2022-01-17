function(id) {
		
	 	VISH.Debugging.log("enter removeMCH option " + id);
		
		VISH.Debugging.log("lo que buscamos vale: "+$("#li_mch_option_"+id.toString()));
		
	
		
			
		//remove children except the text
		$("#li_mch_option_"+id.toString()).children().remove();
		
		var num_inputs =	$(".current").find("."+MultipleChoiceOptionClass).size();
		VISH.Debugging.log("number of inputs: " + num_inputs);
		next_index = String.fromCharCode(next_index);
var i;
var next_index;

		for (i=id; i<num_inputs; i++) {
			VISH.Debugging.log("i vale:  " + i);
			next_index = "a".charCodeAt(0)+ i; 
			next_index = String.fromCharCode(next_index);
			
			VISH.Debugging.log("next_index:  " + next_index);
			
			
			$(".current").find("li#li_mch_option_"+(i+1).toString()+"> input").attr('id', "radio_text_"+i.toString());//.attr(id, "radio_text_"+i.toString());
			
			//do this for every one after the removed element except the last one
			
			
			if(i<(num_inputs-1)) {
			
			$(".current").find("li#li_mch_option_"+(i+1).toString()+"> a").attr('href', "javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+i.toString()+")");
			} 
			else { //for the last one the the icon is for add , so remove whatever there was and 
				// add the add option button 
				
				//
				var add_option_button =" <a id='"+buttonAddOptionId+"' class='add_quiz_option'><img src='images/add_quiz_option.png' id='add_quiz_option_img'/></a>";
				//remove the button icon
				$(".current").find("li#li_mch_option_"+(i+1).toString()+"> a").remove();
				//add the "add button"
				$(".current").find("#li_mch_option_"+(i+1).toString()).append(add_option_button);
				
			}
			//move children up 
			
			$("#li_mch_option_"+i.toString()).append($("#li_mch_option_"+(i+1).toString()).children())
			
		     
		}
		//remove the last index 
		$(".current").find("#li_mch_option_"+num_inputs.toString()).remove();
		//add new counter to add option 
		$(".current").find("#li_mch_option_"+num_inputs.toString())
	}