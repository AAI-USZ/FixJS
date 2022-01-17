function () {
			if (verbose) console.log('Push to ' + options.host + ':' + options.port);

			if (!cleartextStream.authorized) { throw cleartextStream.authorizationError; }

			/* 				
				Event 'notificationError': 
				@arguments 
					<errorCode(string)>, <notificationUID(uint)>

				This event occurs when Apple sends back an error (a bad notification) 
			*/
			cleartextStream.on('data', function (data) {
				// Bytes	value
				// 1 		8
				// 1		errorCode
				// 4		notificationUID
				if (data[0] == 8) { self.emit('notificationError', data[1].toString(), data.readUInt32BE(2)); } 
			});

			/* 
				Event 'error': 
				@argument
					<error>
			
				When a connection error occured 
			*/
			cleartextStream.on('error', function (err) {
				clearConnection();
				self.emit('error', err);
			});

			/* 
				Event 'close':
				The connection was closed (timed-out or Apple closed it) 
			*/
			cleartextStream.once('close', function () {
				clearConnection();
				self.emit('close');
			});

			cleartextStream.on('timeout', function () {
				cleartextStream.destroy();
			});

			/* 
				Event 'drain':
				When the socket is able to send again after having buffered
			*/
			cleartextStream.on('drain', function () {
				if (!buffering) return;

				self.emit('drain');

				var notification = null;
				while ((notification = notifications.shift()) ) {
					var still_buffered = !cleartextStream.write(notification.toNetwork(options.enhanced ? self.nextUID() : null));
					/* 
						Event 'sent':
						@argument
							<notification>

						This event occurs when the notification has been sent to the socket (it may not be sent to the server yet)
					*/
					self.emit('sent', notification);
					if (still_buffered) return; // We still cannot send more notifications, lets give up until a new 'drain' is sent
				}
				buffering = false;
			});

			/* 
				Event 'authorized':
				When the connexion has been made and authorized
			*/
			self.emit('authorized');
			if (callback) callback();
		}