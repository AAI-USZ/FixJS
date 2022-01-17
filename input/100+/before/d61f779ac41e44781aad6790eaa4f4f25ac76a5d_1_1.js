function(event){
		
		//the input in text type  
		var text  = $('<div>').append($('.' +MultipleChoiceOptionClass).clone()).html();
		
		
var inputs_search = $(".current").find("."+MultipleChoiceOptionClass);
		
		var next_num = inputs_search.size();
		var next_index = "a".charCodeAt(0) + next_num; 
			next_index = String.fromCharCode(next_index);

		if (next_num < num_options) {

		    //the next radio input  TODO ... add delete in li and add li with input and letter
		    $(".add_quiz_option").remove();
		    
		    var delete_icon = "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num -1)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
		    
		    $(".current").find("#ul_mch_options").find("#li_mch_option_"+(next_num-1)).append(delete_icon);
		    var add_option = "<li id='li_mch_option_"+next_num+"' class='li_mch_option'>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			//add_option += "<br>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			add_option += "<a id='"+buttonAddOptionId+"' class='add_quiz_option'><img src='images/add_quiz_option.png' id='add_quiz_option_img'/></a></li>";
			
			$(".current").find("#ul_mch_options").append(add_option);
			//remove button + 
					
		} else if (next_num = num_options) {
			
			$(".add_quiz_option").remove();
			
			var delete_icon = "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num -1)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
			$(".current").find("#ul_mch_options").find("#li_mch_option_"+(next_num-1)).append(delete_icon);
			
			// var add_option = "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num -1)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a>";
			 var add_option = "<li id='li_mch_option_"+next_num+"' class='li_mch_option'>"+next_index+")&nbsp;  <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			 add_option += "<a href='javascript:VISH.Editor.Quiz.removeMultipleChoiceOption("+(next_num)+")' id='"+buttonRemoveOptionId+"' class='remove_quiz_option'><img src='images/delete.png' id='remove_quiz_option_img'/></a></li>";
			
			$(".current").find("#ul_mch_options").append(add_option);
		//	$(".mcquestion").append(add_option);

		}
		
	}