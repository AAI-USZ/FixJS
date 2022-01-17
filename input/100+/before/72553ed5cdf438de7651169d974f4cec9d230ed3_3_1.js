function(event){
		
		
		//the input in text type  
		var text  = $('<div>').append($('.' +MultipleChoiceOptionClass).clone()).html();
		
		
		var total = 0;
		
		// get the number of radio inputs 
	$('.'+MultipleChoiceOptionClass).each(function(i){
 total = i;
}); 		
		
		var next_num = parseInt(total)+1;
		var next_index = "a".charCodeAt(0) + next_num; 
			next_index = String.fromCharCode(next_index);
		if (next_num < num_options) {

		    //the next radio input   
			var add_option = "<br>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			add_option += "<a src='' id='"+buttonAddOptionId+"' class='add_quiz_option'><img src='images/add_quiz_option.png' id='add_quiz_option_img'/> </a>";
			
			//remove button + 
			$(".add_quiz_option").remove();
			//add radio + button 			
			$(".mcquestion").append(add_option);	
			
		} else if (next_num = num_options) {
			
			var add_option = "<br>"+next_index+") <input id='radio_text_"+next_num+"' class='"+MultipleChoiceOptionClass+"' type='text' placeholder='insert text option here' />";
			
			$(".add_quiz_option").remove();
			
			$(".mcquestion").append(add_option);
		}
		
	}