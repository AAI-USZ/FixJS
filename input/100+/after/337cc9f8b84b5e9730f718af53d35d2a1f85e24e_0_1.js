function(event){
		
		//the input in text type  
		var text  = $('<div>').append($('.' +MultipleChoiceOptionClass).clone()).html();
		
		
var inputs_search = $(".current").find("."+MultipleChoiceOptionClass);
		//var next_num = parseInt(total)+1;
		//var next_num = num_inputs;
		var next_num = inputs_search.size();
		var next_index = "a".charCodeAt(0) + next_num; 
			next_index = String.fromCharCode(next_index);

		if (next_num < num_options) {

		    //the next radio input  
		    var add_option = "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num -1)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
		     
			add_option += "<br>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			add_option += "<a id='"+buttonAddOptionId+"' class='add_quiz_option'><img src='images/add_quiz_option.png' id='add_quiz_option_img'/></a>";
			
			//remove button + 
			$(".add_quiz_option").remove();
			//add radio + button 	
			$(".current").find(".mcquestion").append(add_option);		
				

			
		} else if (next_num = num_options) {
			
			 var add_option = "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num -1)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
			 add_option += "<br>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			 add_option += "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
			$(".add_quiz_option").remove();
			
			$(".mcquestion").append(add_option);

		}
		
	}