function(event_name, data){
			if(data && data.stack) // error
				return self.say(data.toString())
			else // if (!event_name.match('actions_'))
				self.say("New event: " + event_name, data);

			if(self.combos[event_name])
				self.parse_message(self.combos[event_name], true);

			delete self.combos[event_name];
		}