function(role, element, template){
   
   		role = V.SlideManager.getUser().role;
   var obj;
   		switch(role) {
   	 
   	
   			case "logged": 
      	//render the slide for a logged user
      		obj = _renderMcquestionLogged (element, template); 
      		//add listener to stat Button
      		$(document).on('click', '.mcquestion_start_button', _onStartMcQuizButtonClicked);
      		
   			break;
   
   			case "student":
   		//render the slide for a student (he knows the shared URL) and no logged user 
   			obj =  _renderMcquestionStudent (element, template); 
   			//add listener to send button _onSendVoteMcQuizButtonClicked
      		 		$(document).on('click', '.mcquestion_send_vote_button', _onSendVoteMcQuizButtonClicked);
   			break;
   
   			case "none":
   		//render the slide for a viewer (he doesn't know the shared) URL an not logged user
   			obj =  _renderMcquestionNone (element, template);
   			
   			
   			break;
   
   			default: 
   			//obj could be an error message :  <p> Error</p>
   			VISH.Debugging.log("Something went wrong while processing the Quiz");	
   	
   		}
   
   
   return obj;
   
   	   
  // $(document).on('click', '#edit_excursion_details', _onEditExcursionDetailsButtonClicked);
   
   }