function(item) {
			var talk = new Talk(item, favorite)

			talksList.days[talk.day] = true;
			talksList.locations[talk.location] = true;

			talksList.full.push(talk);
		}