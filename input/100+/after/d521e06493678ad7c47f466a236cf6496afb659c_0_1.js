function SocketClient()

{	

	var socket = null;

	var callbackcue = [];

	var url = config.host+":"+config.port;

	var messageId = 1; ///every message send to server is attached to an id to identify the belonging callback. 

						///sending messages to the server is not parallelerized and thus we need an identification

		

	/**

	 * sends a command to the websocket server

	 * the callback

	 */

	this.send =  function(command, params)

	{

		socket.send(JSON.stringify({'callbackid':messageId,'command':command,'data':params}));

		messageId++;

	}

	

	this.getSocket = function()

	{

		return socket;

	}

	

	this.open = function()

	{

		 socket = new WebSocket(url);

	    

		 socket.onmessage = function(e) {

				 

			 try{

				 var json = JSON.parse(e.data);

			 }

			 catch(e)

			 {

				return console.log('invalid data received ',e);

			 }

			 

			 //look for callback in cue

			 if (json.callbackid && callbackcue['|'+json.callbackid])

			 {

				var cb = callbackcue['|'+json.callbackid];

				delete callbackcue['|'+json.callbackid];

				cb();

			 }

			 

			 

			 if (json.command)

			 {

				switch (json.command)

				{

					case  'bladiebla':

						//do something

					break;

				}

			 } 

			 

	     };

	},

	

	this.close = function()

	{

		//TODO

	}

}