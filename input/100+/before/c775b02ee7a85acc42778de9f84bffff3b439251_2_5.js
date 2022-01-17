function(
		gameControllersAssigned,
		participants,
		participantController
	) {

		_highlightedControllersToParticipants = { };
		_assignedParticipantsToControllers = { };
		
		var navigateParticipant = function(controllerId, mod) {

			var participantCount = participants.length;
			
			var oldparticipant = (_highlightedControllersToParticipants[controllerId] > -1 ) ? _highlightedControllersToParticipants[controllerId] : -1;

			var participant = oldparticipant + mod;
			
			if (participant > participantCount - 1) {
				participant = 0;
			}
			else if (participant < 0) {
				participant = participantCount - 1;
			}
			
			while(_assignedParticipantsToControllers[participant]) {
				participant += mod;
				if (participant > participantCount - 1) {
				participant = 0;
				}
				else if (participant < 0) {
					participant = participantCount - 1;
				}
			}
			
			_highlightedControllersToParticipants[controllerId] = participant;

			if (oldparticipant != -1)
				removeParticipantHighlight(controllerId, oldparticipant);
				
			addParticipantHighlight(controllerId, participant);
			
		};
	
		var gamepadPressed = function (left, up, right, down, controllerId) {
			if (left) {
				navigateParticipant(controllerId, -1);
			} else if (right) {
				navigateParticipant(controllerId, 1);
			}
		};

		var buttonsPressed = function (buttonA, buttonB, buttonC, buttonD, controllerId) {
		    var participant = _highlightedControllersToParticipants[controllerId];
		   
		    if (typeof participant === "undefined") {
		        return;
		    }
		   
		    if (typeof _assignedParticipantsToControllers[controllerId] !== "undefined") {
				return;
			}

			_assignedParticipantsToControllers[participant] = controllerId;

            var p = participants[participant];

            controllers.mapController(p.gameController.gamepadPressed, p.gameController.gamepadReleased, p.gameController.buttonsPressed, p.gameController.buttonsReleased, p.gameController.joystick, controllerId); 
                      
			if (Object.keys(_assignedParticipantsToControllers).length === participants.length)
			{
			    if (typeof gameControllersAssigned === "undefined") {
    			    return;
    		    }

                $("#assignGameControllersOverlay").remove();
                
    		    gameControllersAssigned();

			}
            

            		    
		};

		var buttonsReleased = function() {};
		var gamepadReleased = function() {};
		var joystick = function() {};

		controllers.mapControllers(gamepadPressed, gamepadReleased, buttonsPressed, buttonsReleased, joystick);

		constructOverlay(participants);

//		for (var i = 0; i < participants.length; i++) {

//			_gameControllerMap[i] = participants[i];

//			if (typeof participants[i] === "undefined") {
//				continue;
//			}

//			if (typeof participants[i].gameController === "undefined") {
//				participants[i].gameController =
//					{
//						joystick: function(x, y) { },
//						gamepadPressed: function(left, up, right, down) { },
//						gamepadReleased: function(left, up, right, down) { },
//						buttonsPressed: function(buttonA, buttonB, buttonC, buttonD) { },
//						buttonsReleased: function(buttonA, buttonB, buttonC, buttonD) { }
//					};
//			}

//		}


	}