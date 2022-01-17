function(rv){//get a view of the room
			roomView = rv
			user = roomView.make('user', {name: username})//create a new user
			out.write('you have entered room: ' + roomName+'\n')
			prompt()
			inn.resume();
			
			//listen for new messages added to the room
			//any new messages that 'belong' to this room, according to the rules in
			//chat.minnow, will be sent from the server to the client
			//and will trigger this event
			roomView.messages.on('add', function(msg){
				console.log('GOT ADD EVENT: ' + new Error().stack)
				out.write(msg.user.name.value()+'> ' + msg.text.value()+'\n')
			})
			currentTask = sendMessage
		}