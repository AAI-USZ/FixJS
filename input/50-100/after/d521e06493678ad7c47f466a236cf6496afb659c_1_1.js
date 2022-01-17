function()

	{

		 socket.on('ping', function(message) {

			 log('ping');

		 });

		 

		 socket.on('pong', function(message) {

			 log('pong');

		 });

	

		 socket.on('message', function(message) {

			 processMessage(message);

	   	 });

		 

		 socket.on('close', function(message) {

			//remove from server

	   	 });

	}