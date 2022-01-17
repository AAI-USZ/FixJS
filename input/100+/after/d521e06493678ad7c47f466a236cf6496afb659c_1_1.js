function(message)

	{

		log('process message',message);

		try

		{

			var json = JSON.parse(message);

		}

		catch(e)

		{

			return console.log("error parsing message. invalid json");

		}

		

		var command = json.command;

		var data = json.data

		

		if (!method)

		{

			return console.log("no command and or data given");

		}

		

		switch (method)

		{

			case "getGames":

				log('get games');

			break;

		

			case "createGame":		

			

			break;

			

			case "joinGame":

			

			break;

			

			case "gameEnds":

			

			break;

			

			case "quitGame":

			

			break;

			

			case "move":

				

			break;

			

			case "winGame":

			

			break;

			

		}

	}