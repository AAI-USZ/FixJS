function(acceptedMessage) {
		var pumpCallback = function(e) {
			if (e.bytesProcessed == -1) { // EOF
				Ti.API.info("<EOF> - Can't perform any more operations on connected socket");

			} else if (e.errorDescription == null || e.errorDescription == "") {
				var data = e.buffer.toString();
				harnessGlobal.common.processDriverData(data);

			} else {
				Ti.API.info("READ ERROR: " + e.errorDescription);
			}
		};

		var listenSocket = Ti.Network.Socket.createTCP({
		    port: harnessGlobal.socketPort,
		    accepted: function(e) {
    		    driverSocket = e.inbound;

				var readyMessage = {type: "ready"};
    		    driverSocket.write(Ti.createBuffer({value: JSON.stringify(readyMessage)}));

    		    Ti.Stream.pump(driverSocket, pumpCallback, 1024, true);
    		},
    		error: function(e) {
				e.socket.close();
			}
		});
		listenSocket.listen();

		listenSocket.accept({
			error: function(e) {
				Ti.API.error("error occured on driver socket, closing");
				e.socket.close();
			}
		});
	}