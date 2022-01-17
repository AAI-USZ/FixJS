f
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
				console.log("while(_assignedParticipantsToControllers[participant]) {");
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
