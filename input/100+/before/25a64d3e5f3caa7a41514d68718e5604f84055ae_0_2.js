function Push(tls_opts, opts) {
    if (false === (this instanceof Push)) {
        return new Push(tls_opts, opts);
    }
    
    events.EventEmitter.call(this);

	var options = {
		host: APNS.production.host,
		port: APNS.production.port,

		enhanced: true, /* Enhanced payloads mode or not */
		verbose: false /* verbose mode, say more about what is going on */
	};

	// Merge options
	for (key in opts) {
		if (opts.hasOwnProperty(key)) options[key] = opts[key];
	}

	// Options checking
	if (!tls_opts) throw "No tls connection options";

    var uid = 0 				/* Notifications' id */
	,	cleartextStream = null 	/* holds the stream to Apple */
	,	notifications = []		/* holds the unsent notifications */
	, 	buffering = false		/* Are we sending notifications directly to the cleartext stream or buffering them until a drain occurs ? */
	, 	self = this
	,	verbose = !!options.verbose
	;

	if (verbose) { // Hijack the emit to be more verbose
		var _emit = this.emit;
		this.emit = function () { 
			console.log('Emit ', arguments);
			_emit.apply(self, arguments);
		};
	}

	function setupConnection (callback) {
		cleartextStream = tls.connect(options.port, options.host, tls_opts, function () {
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
		});

		/* 
			Event 'clientError':
			@argument
				<error>

			This event occurs when the client errors before connexion handshake
		*/
		cleartextStream.on('clientError', function(error) {
			self.emit('clientError', error);
		});
	};

	function ensureConnection(callback) {
		if (cleartextStream && cleartextStream.writable) {
			callback();
		} else {
			clearConnection();
			setupConnection(callback);
		}
	}

	function clearConnection() {
		if (cleartextStream) cleartextStream.removeAllListeners();
		cleartextStream = null;
		buffering = false;
	}


	/* public instance methods */

	/* You may wish to check if it's already buffering so you can manage to buffer notifications by other means, else we do it */
	this.isBuffering = function () { return !!buffering; }

	/* You may provide your own method for nextID() */
	this.nextUID = function () { return uid++; }

	/* Send an _assumed_ _valid_ notification, you should always check the notification's validity with Notification#isValid() before sending it */
	this.sendNotification = function (notification) {
		if (false === (notification instanceof Notification)) {
			return false;
		}

		ensureConnection(function() {
			if (buffering) { notifications.push(notification); return; } // Default buffering

			if (!cleartextStream.write(notification.toNetwork(options.enhanced ? self.nextUID() : null))) {
				buffering = true;

				/* 
					Event 'buffer':
					This event occurs when the socket starts buffering (network too slow?)
				*/
				self.emit('buffer');
			}

			/* 
				Event 'sent':
				@argument
					<notification>
						
				This event occurs when the notification has been sent to the socket (it may not be sent to the server yet)
			*/
			self.emit('sent', notification);
		});
	}

	return this;
}