function (profile) {

	this.profile = profile;

	/* profile.host: The hostname of the IRC server to connect to */
	this.host = profile.host || "localhost";

	/* profile.port: The port in which the server is listening to */
	this.port = profile.port || 6667;

	/* profile.name: The special name used to identify the connection */
	this.name = profile.name || this.host;

	/* profile.nick: The IRC nickname */
	if (typeof profile.nick === "string") {
		this.nickname      = profile.nick;
		this.nickname_alts = [];
	} else {
		this.nickname      = profile.nick[0];
		this.nickname_alts = profile.nick.slice (1);
	}

	/* profile.user: The IRC username */
	this.username   = profile.username || "guest";

	/* profile.realname: The real name used to identify the user */
	this.realname   = profile.realname || "Guest";

	/* profile.password: The IRC password, if any */
	this.password   = profile.password || null;

	/* profile.encoding: The encoding of the stream */
	this.encoding   = profile.encoding || "utf8";

	this.welcomed   = false;
	this.connected  = false;
	this.connection = null;
	this.timeout    = 0;

	/* Flood protection */
	this.message_queue = [];
	this.message_speed = profile.message_speed || 2200; // Time between messages in milliseconds
	this.message_time  = 0; // Time the last message was sent

	this.on ("connect", (function () { this.identify (); }).bind (this));
	this.on ("secureConnect", (function () {
		if (this.connection.authorized) {
			this.emit ("connect");
		} else {
			console.log ("%s: Peer certificate was not signed by specified CA: %s", this.name, this.connection.authorizationError);
			this.connection.end ();
		}
	}).bind (this));

	var buffer = "";
	this.on ("data", (function (chunk) {
		var offset, message;

		buffer += chunk;
		while (buffer) {
			offset = buffer.indexOf ("\r\n");
			if (offset < 0) return;

			message = buffer.substr (0, offset);
			buffer  = buffer.substr (offset + 2);

			this.emit ("raw", message);
		}
	}).bind (this));

	this.on ("raw", (function (message) {
		var data;

		data = this.parse_message (message);
		if (data) {
			this.emit ("message", data);
			this.emit (data.command, data);
		}
	}).bind (this));

	this.on ("PING", function (data) {
		this.raw ("PONG :" + data.message);
	});

	this.on ("001", function () { this.welcomed = true; }); // Welcome
}