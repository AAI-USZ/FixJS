function (data) {

			log("connected. waiting for input");

			socket.emit('game', {info: "game ready for input"});

		}