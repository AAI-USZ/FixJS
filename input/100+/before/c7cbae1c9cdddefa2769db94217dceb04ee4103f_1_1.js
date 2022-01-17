function(_options) {
	var cmbot = this;
	this.VERSION = '0.9.6';
	
	this.initOptions(_options);
	this.currentSong = false;
	
	this.timezones =  {
		'EST': '-5',
		'CST': '-6',
		'MST': '-7',
		'PST': '-8',
	};
	this.bot = new Bot(this.options.bot.auth, this.options.bot.userid, this.options.bot.roomid);
	
	this.customEvents = {};
	this.customCommands = {};
	
	// Sqlite3
	if(this.options.sqlite.enabled) {
		try {
			var sqlite3 = require('sqlite3').verbose();
			this.sqlite = new sqlite3.Database(this.options.sqlite.file, function(error) {
				if(error != null) {
					log("Attempting to open sqlite3 database failed: ", err);
					this.options.sqlite.enabled = false;
				}
			});
		} catch (e) {
			log("Error setting up sqlite: ", e);
			this.options.sqlite.enabled = false;
		}
	}
	
	
//	this.setStrings();
	this.session = {
		nosong: false,
		lamed: false, // Has the bot lamed the currently playing track?
		scrobbled: false,
		current_scrobble: false, // timer for the current scrobble - if the user steps down or is taken down before the scrobble happens, cancel the timer to do the scrobble
		djs: [],
		custom_modules: false,
		djing: false, // is the bot dj'ing
		loved: false,
		autodjing: false, // If the bot autodj's, this will get set to true. When someone adds themselves to the queue, the bot will only step down if it automatically stepped up (ie, it won't step down if a mod made it dj manually)
		autodj: this.options.autodj,
		snagged: false,
		stfu: false,
		max_djs: 5,
		current_dj: false, // Which dj is currently playing a song
		songstarted: false, // timestamp of when the current song started
		refreshes: [], // DJ's who are refreshing their browser
		warned: false,
		triggers: {},
		timers: {
			autodj: false
		},
		current_song_tags: false,
		votes: {
			up: [],
			down: []
		},
		enforcement: true, // Queue enforcement
		queueTimer: {},
		lastfm: {
			enabled: false
		},
		start_time: new Date()
	};

	
	if(this.options.modules_directory !== false) {
		var mstats = fs.lstatSync(this.options.modules_directory);
		if(mstats.isDirectory()) {
			this.session.custom_modules = true;
		}
		if(this.options.autoload_modules === true && this.session.custom_modules) {
			log("Autoloading modules");
			fs.readdir(cmbot.options.modules_directory, function(err, files) {
				files.sort();
				for(var i=0;i<files.length;i++) {
					var file = files[i];
					if(file.match(/\.js$/)) {
						try {
							var result = cmbot.loadModule(cmbot.options.modules_directory + "/" + file);
							for(var j=0;j<result.messages.length;j++)
								log(result.messages[j]);
						} catch(e) {
							log("Exception loading " + file + "module: ", e.stack);
						}
					}
				}
			});
		}
	}
	
	if(this.options.messages.length > 0)
		this.setupMessages(); // Start the timers to display informational messages
	this.settings = $.extend({
		shitlist: {},
		idleDJTimeout: 15,
		triggerLimit: {},
		triggerBan: {},
		timezones: {},
		triggers: {},
		modtriggers: {},
		playcounts: {},
		modpm: true,
		bannedTracks: {},
		room_name: false,
		room_shortcut: false,
		room_id: false,
		queue: [],
		phrases: {},
		bannedArtists: {},
		bannedSongs: {},
		mobileWhitelist: {},
		acl: {
			addacl: {},
			remacl: {}
		},
		lastfm_session_key: false
		}, this.loadSettings());

	this.initQueue();
	
	this.lastfm = false;
	if(this.options.lastfm.enabled === true) {
		if(this.settings.lastfm_session_key != undefined && this.settings.lastfm_session_key != '')
			this.options.lastfm.session_key = this.settings.lastfm_session_key;
		this.lastfm = new Lastfm(this.options.lastfm);
		if(this.options.lastfm.session_key === false) {
			this.lastfm.getSessionKey(function(result) {
				log("session key = " + result.session_key);
				cmbot.settings.lastfm_session_key = result.session_key;
				cmbot.saveSettings();
			});
		}
	}

	this.users = {};
	this.mods = {};
	
	this.commandAliases = {
		'commands': 'help',
		'unafk': 'back',
		'away': 'afk'
	};

	// Command Time Limits - how many seconds since the last time this command was said by any user before the bot will respond to it again
	this.commandTimeLimits = {
		triggers: 5,
		queue: 5,
		help: 5
	};
	
	this.customEventsSupported = [
	'speak', 'ready', 'roomChanged', 'update_votes', 'newsong', 'endsong', 'pmmed', 'add_dj', 'rem_dj', 'update_user', 'new_moderator',
	'rem_moderator', 'registered', 'deregistered', 'booted_user', 'snagged', 'nosong', 'tcpConnect', 'tcpMessage', 'tcpEnd',
	'httpRequest' ];

	this.commandTimestamps = {};
	this.triggerTimeStamps = {};

	this.twit = false;
	if(typeof this.options.twitter == 'object') {
		try {
			this.twit = new twitter({
				consumer_key: this.options.twitter.consumer_key,
				consumer_secret: this.options.twitter.consumer_secret,
				access_token_key: this.options.twitter.access_token_key,
				access_token_secret: this.options.twitter.access_token_secret
			});
			this.twit.verifyCredentials(function (err, data) {
				log("twitter verified");
//	        log(data);
			});
		} catch(e) {}
	}
	
	

	this.eventReady();
	
	this.eventRoomChanged();
	this.eventSpeak();
	this.eventPM();
	
	this.eventUpdateVotes();
	this.eventNewSong();
	this.eventNoSong();
	this.eventEndSong();
	this.eventAddDj();
	this.eventRemDj();
	this.eventUpdateUser();
	this.eventNewModerator();
	this.eventRemModerator();
	this.eventRegistered();
	this.eventDeregistered();
	this.eventBootedUser();
	this.eventSnagged();
	
	
	this.eventTcpConnect();
	this.eventTcpMessage();
	this.eventTcpEnd();
	this.eventHttpRequest();
	
	if(this.options.mysql.enabled) {
		var song_table = 'song';
		var songlog_table = 'songlog';
		var mysql = this.getMysqlClient();
		if(mysql !== false) {
			log("Checking for table '" + song_table + "':");
			mysql.query("show tables like '" + song_table + "'", 
				function selectCb(err, results, fields) {
				if(results.length == 0) {
					mysql.query(
							'CREATE TABLE IF NOT EXISTS `' + song_table + '` (' + 
							'`id` varchar(100) NOT NULL,' + 
							'`track` varchar(255) DEFAULT NULL,' + 
							'`artist` varchar(255) DEFAULT NULL,' + 
							'`album` varchar(255) DEFAULT NULL,' + 
							'`coverart` varchar(255) DEFAULT NULL,' + 
							'`length` int(11) DEFAULT NULL,' + 
							'`mnid` varchar(50) DEFAULT NULL,' + 
							'`genre` varchar(255) DEFAULT NULL,' + 
							'PRIMARY KEY (`id`)' + 
							') ENGINE=InnoDB DEFAULT CHARSET=utf8;', function(err) {
								log("Checking for table '" + songlog_table + "'");
								mysql.query("show tables like '" + songlog_table + "'", 
										function selectCb(err, results, fields) {
											if(results.length == 0) {
												mysql.query(
														'CREATE TABLE IF NOT EXISTS `' + songlog_table + '` (' + 
														'`songid` varchar(100) DEFAULT NULL,' + 
														'`starttime` datetime NOT NULL,' + 
														'`upvotes` int(11) DEFAULT NULL,' + 
														'`downvotes` int(11) DEFAULT NULL,' + 
														'PRIMARY KEY (`starttime`),' + 
														'KEY `songid` (`songid`)' + 
														') ENGINE=InnoDB DEFAULT CHARSET=utf8;', function(err) {
															mysql.query(
																'ALTER TABLE `' + songlog_table + '`' + 
																'ADD CONSTRAINT `' + songlog_table + '_ibfk_1` FOREIGN KEY (`songid`) REFERENCES `' + song_table + '` (`id`);', function(err) {
																	log("Done!");
																});
														});
											}
								});
							});
				}
			});
		} else {
			log("Error: mysql doesn't seem to be installed.");
		}
	} else if(this.options.sqlite.enabled) {
		log("Sqlite3:");
		var song_table = 'song';
		var songlog_table = 'songlog';
		var cmbot = this;
		
		cmbot.sqlite.run('CREATE TABLE IF NOT EXISTS `' + song_table + '` (' + 
				'`id` varchar(100) NOT NULL, ' + 
				'`track` varchar(255) DEFAULT NULL, ' + 
				'`artist` varchar(255) DEFAULT NULL, ' + 
				'`album` varchar(255) DEFAULT NULL, ' + 
				'`coverart` varchar(255) DEFAULT NULL, ' + 
				'`length` int(11) DEFAULT NULL, ' + 
				'`mnid` varchar(50) DEFAULT NULL, ' + 
				'`genre` varchar(255) DEFAULT NULL, PRIMARY KEY (`id`))', function(err, changes) {
			if(err != null) {
				log("Something went wrong trying to initialize the song table: ", err);
				cmbot.options.sqlite.enabled = false;
			} else {
				cmbot.sqlite.run('CREATE TABLE IF NOT EXISTS `' + songlog_table + '` (' + 
					'`songid` varchar(100) DEFAULT NULL,' + 
					'`starttime` datetime NOT NULL,' + 
					'`upvotes` int(11) DEFAULT NULL,' + 
					'`downvotes` int(11) DEFAULT NULL,' + 
					'PRIMARY KEY (`starttime`) ' +
					'FOREIGN KEY (`songid`) REFERENCES song(`id`)' +
					')', function(err, changes) {
					if(err != null) {
						log("Something went wrong trying to initialize the songlog table: ", err);
						cmbot.options.sqlite.enabled = false;
					}
				});
					
			}
		});
	}
}