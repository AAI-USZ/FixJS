function()

	{

		 socket.on('ping', function(message) {

			 log('ping');

		 });

		 

		 socket.on('pong', function(message) {

			 log('pong');

		 });

	

		 socket.on('message', function(message) {

			 this.processMessage(message);

	   	 });

		 

		 socket.on('close', function(message) {

			 playout.removeChannelListener(this);

	   	 });

	}