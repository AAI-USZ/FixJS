function(protocol, hostname, port) {
	protocol = protocol || location.protocol;
	hostname = hostname || location.hostname;
	port = port || location.port;
	this.serverUrl = protocol + "//" + hostname + ":" + port;

	/**** Scramble server stuff ***/
	this.puzzlesUrl = this.serverUrl + "/puzzles/";
	this.scrambleUrl = this.serverUrl + "/scramble/";
	this.viewUrl = this.serverUrl + "/view/";
	this.importUrl = this.serverUrl + "/import/";

	//TODO - document!	
	this.createAreas = function(faces, scale) {
		var deepJoin = function(arr, sep) {
			return arr.map(function(item) { return item.map(function(coord) { return coord*scale; }).join(sep); }).join(sep);
		};
		var areas = [];
		for(var faceName in faces) {
			if(faces.hasOwnProperty(faceName)) {
				var faceAreas = faces[faceName];
				for(var i = 0; i < faceAreas.length; i++) {
					var area = document.createElement('area');
					area.faceName = faceName;
					area.setAttribute('shape', 'poly');
					var coords = deepJoin(faceAreas[i], ",");
					area.setAttribute('coords', coords);
	
					areas.push(area);
				}
			}
		}
		return areas;
	};
	this.flattenColorScheme = function(colorScheme) {
		var faces = [];
		for(var face in colorScheme) {
			if(colorScheme.hasOwnProperty(face)) {
				faces.push(face);
			}
		}
		faces.sort();
		var scheme = '';
		for(var i = 0; i < faces.length; i++) {
			if(i > 0) { scheme += ','; }
			scheme += colorScheme[faces[i]];
		}
		return scheme;
	};
	
	this.loadPuzzles = function(callback) {
		return tnoodle.ajax(callback, this.puzzlesUrl, null);
	};
	
	this.loadScramble = function(callback, puzzle, seed) {
		return this.loadScrambles(function(scrambles) {
			callback(scrambles[0]);
		}, puzzle, seed, 1);
	};
	var pendingLoadScrambles = null;
	this.loadScrambles = function(callback, puzzle, seed, count) {
		if(pendingLoadScrambles) {
			pendingLoadScrambles.abort();
			pendingLoadScrambles = null;
		}
		var query = {};
		if(seed) { query.seed = seed; }
		if(!count) { count = 1; }
		query[''] = encodeURIComponent(puzzle) + "*" + count;
		pendingLoadScrambles = tnoodle.retryAjax(function(scrambleRequests) {
			if(scrambleRequests.error) {
				// If there's any kind of error, retryAjax will back off and try again
				//log(scrambleRequests.error);
				//f(scrambleRequests.error == tnoodle.BACKING_OFF) {
				//	log(scrambleRequests.secondsRemaining + ' seconds remaining');
				//}
				// TODO use global status stuff from hackathon2011
				return;
			}

			pendingLoadScrambles = null;
			var scrambles = [];
			for(var i = 0; i < scrambleRequests.length; i++) {
				scrambles = scrambles.concat(scrambleRequests[i].scrambles);
			}
			callback(scrambles);
		}, this.scrambleUrl + ".json", query);
		return pendingLoadScrambles;
	};
	this.getScrambleImageUrl = function(puzzle, scramble, colorScheme, width, height) {
		scramble = scramble || "";
		var query = { "scramble": scramble };
		if(width) { query.width = width; }
		if(height) { query.height = height; }
		if(colorScheme) {
			query.scheme = this.flattenColorScheme(colorScheme);
		}
		return this.viewUrl + encodeURIComponent(puzzle) + ".svg?" + tnoodle.toQueryString(query);
	};
	this.getPuzzleIconUrl = function(puzzle) {
		return this.viewUrl + encodeURIComponent(puzzle) + ".png?icon=true";
	};
	this.loadPuzzleImageInfo = function(callback, puzzle) {
		// callback must be a function(defaultPuzzleInfo)
		// where defaultPuzzleInfo.faces is a {} mapping face names to arrays of points
		// defaultPuzzleInfo.size is the size of the scramble image
		// defaultPuzzleInfo.colorScheme is a {} mapping facenames to hex color strings
		return tnoodle.ajax(callback, this.viewUrl + encodeURIComponent(puzzle) + ".json", null);
	};
	this.importScrambles = function(callback, url) {
		return tnoodle.ajax(callback, this.importUrl, { url: url });
	};
	
	var uploadForm = null;
	this.getUploadForm = function(onsubmit, onload) {
		//onsubmit and onload are only used the first time this method is called
		if(uploadForm === null) {
			sendFileIframe = document.createElement('iframe');
			sendFileIframe.style.display = 'none';
			sendFileIframe.name = 'sendFileIframe';
			sendFileIframe.src = 'about:blank';
			document.body.appendChild(sendFileIframe);
			var serverUrl = this.serverUrl;
			xAddListener(window, "message", function(e) {
				if(e.origin == serverUrl) {
					var scrambles = JSON.parse(e.data);
					onload(scrambles);
				} else {
					onload({error: "Bad origin: " + e.origin + ", expecting " + serveriUrl});
				}
			}, false);
			
			uploadForm = document.createElement('form');
			uploadForm.setAttribute('method', 'post');
			uploadForm.setAttribute('action', this.importUrl);
			uploadForm.setAttribute('enctype', 'multipart/form-data');
			uploadForm.setAttribute('target', 'sendFileIframe');
			xAddListener(uploadForm, 'submit', function() {
				var abortSubmit = { abort: function() { sendFileIframe.src='about:blank'; } };
				onsubmit(fileInput.value, submit, abortSubmit);
			}, false);
			
			var fileInput = document.createElement('input');
			fileInput.setAttribute('type', 'file');
			fileInput.setAttribute('name', 'scrambles');
			var submit = document.createElement('input');
			submit.type = 'submit';
			submit.value = 'Load Scrambles';
			
			uploadForm.appendChild(fileInput);
			uploadForm.appendChild(submit);
		}
		return uploadForm;
	};
	this.toString = function() {
		return this.serverUrl;
	};

	
	/**** Time server stuff ***/
	
	function Configuration() {
		//TODO GAH! localStorage doesn't work offline in ff! wtf?
		//https://bugzilla.mozilla.org/show_bug.cgi?id=507361
		var localFile = document.location.href.match(/^file:\/\/.*$/) && navigator.userAgent.match(/firefox/i);
		var cookies = null;
		if(!localStorage || localFile) {
			var Cookies = function() {
				function setCookie(c_name,value,expiredays)
				{
				var exdate=new Date();
				exdate.setDate(exdate.getDate()+expiredays);
				document.cookie=c_name+ "=" +escape(value)+
				((!expiredays) ? "" : ";expires="+exdate.toUTCString());
				}
				
				var data = {};
				
				var cookies = document.cookie.split(';');
				this.length = cookies.length;
				var keys = [];
				for(var i = 0; i < this.length; i++) {
					var key_val = cookies[i].split('=');
					var key = key_val[0].trim();
					var val = unescape(key_val[1]);
					data[key] = val;
					keys.push(key);
				}
				this.key = function(i) {
					return keys[i];
				};
				this.getItem = function(key) {
					return data[key];
				};
				this.setItem = function(key, val) {
					data[key] = val;
					setCookie(key, val.replace(/;/g, '\\u003b').replace(/\=/g, '\\u003d'), 100);
				};
			};
			cookies = new Cookies();
		} else {
			cookies = localStorage;
		}
		var data = {};
		for(var i = 0; i < cookies.length; i++) {
			var key = cookies.key(i);
			try {
				//NOTE: JSON.encode is hacked to deal with Infinity
				data[key] = JSON.decode(cookies.getItem(key));
			} catch(error) {
				//oh well
			}
		}
		
		this.set = function(property, value) {
			if(value === null || value === undefined) {
				delete data[property];
				delete cookies[property];
			} else {
				data[property] = value;
//				cookies.setItem(property, JSON.stringify(value));
				//it seems that mootools is breaking stringify with arrays?
				
				//NOTE: JSON.encode is hacked to deal with Infinity
				cookies.setItem(property, JSON.encode(value));
			}
		};
		this.get = function(property, def) {
			if(!(property in data)) {
				this.set(property, def); // This is pretty silly
				return def;
			}
			return data[property];
		};
	}
	this.configuration = new Configuration();

	var server = this;
	this.formatTime = function(millis, decimalPlaces) {
		if(millis === null) {
			return "";
		}
		millis = Math.round(millis);
		if(decimalPlaces !== 0) {
			decimalPlaces = decimalPlaces || server.configuration.get('timer.statsDecimalPlaces');
		}
		
		if(millis == Infinity) {
			return "DNF";
		} else if(server.configuration.get('clockFormat', true)) {
			return server.clockFormat(millis, decimalPlaces);
		} else {
			return (millis*(1.0/unitsPerSecond)).toFixed(decimalPlaces);
		}
	};
	this.clockFormat = function(timeMillis, decimalPlaces) {
		timeMillis = Math.round(timeMillis);
		if(decimalPlaces !== 0) {
			decimalPlaces = decimalPlaces || server.configuration.get('timer.statsDecimalPlaces');
		}
		
		// Javascript behaves *retardedly* with small numbers (< 1e-6)
		// > parseInt(1/(1000*60*60)+"")
		//   2
		// The guys at mootools opted not to change this behavior.
		//  http://mootools.lighthouseapp.com/projects/2706/tickets/936
		// Se we're very careful to use Math.floor instead of parseInt
		// or mootool's .toInt().
		var hours = Math.floor(timeMillis / (1000*60*60));
		timeMillis = timeMillis % (1000*60*60);
		var minutes = Math.floor(timeMillis / (1000*60));
		timeMillis = timeMillis % (1000*60);
		var seconds = Math.floor(timeMillis / 1000);
		var millis = timeMillis % 1000;
	
		var clocked = "";
		if(hours > 0) {
			clocked += hours + ":";
			if(minutes === 0) {
				clocked += "00:";
			} else if(minutes < 10) {
				clocked += "0";
			}
		}
		if(minutes > 0) {
			clocked += minutes + ":";
			if(seconds < 10) {
				clocked += "0";
			}
		}
		clocked += seconds;
		if(decimalPlaces > 0) {
			var decimals = "";
			if(millis < 100) {
				decimals += "0";
				if(millis < 10) {
					decimals += "0";
				}
			}
			decimals += millis;
			if(decimalPlaces <= 3) {
				decimals = decimals.substring(0, decimalPlaces);
			} else {
				//just for completeness
				for(var i = 3; i < decimalPlaces; i++) {
					decimals += "0";
				}
			}
			
			clocked += "." + decimals;
		}
		
		return clocked;
	};
	

	this.createSession = function(puzzle, event) {
		//id is the number of seconds since the epoch encoded in base 36 for readability
		var id = Math.round(new Date().getTime()/1000).toString(36);
		if(id in sessions) {
			//we don't want duplicate session ids
			return null;
		}
		var sesh = new tnoodle.Session(this, id, puzzle, event);
		sessions.push(sesh);
		this.saveSessions();
		return sesh;
	};
	this.disposeSession = function(session) {
		var i = sessions.indexOf(session);
		if(i < 0) {
			//couldn't find the session
			return false;
		}
		sessions.splice(i, 1);
		this.saveSessions();
		return true;
	};
	this.getSessions = function(puzzle, event) {
		var sessions = this.sessions.slice();
		if(puzzle !== undefined) {
			sessions = sessions.filter(function(session) { return session.getPuzzle() == puzzle; });
		}
		if(event !== undefined) {
			sessions = sessions.filter(function(session) { return session.getEvent() == event; });
		}
		sessions.sort(function(a, b) {
			return b.getDate().diff(a.getDate());
		});
		return sessions;
	};

	var events = {};
	this.getEvents = function(new_puzzle) {
		//initializing the available events
		for(i = 0; i < sessions.length; i++) {
			var puzzle = sessions[i].getPuzzle();
			var event = sessions[i].getEvent();
			if(!(puzzle in events)) {
				events[puzzle] = [ '' ];
			}
			if(!events[puzzle].contains(event)) {
				events[puzzle].push(event);
			}
		}
		if(!(new_puzzle in events)) {
			events[new_puzzle] = [ '' ];
		}
		events[new_puzzle].sort();
		return events[new_puzzle];
	};
	this.createEvent = function(puzzle, event) {
		var events = this.getEvents(puzzle);
		if(!events.contains(event)) {
			events.push(event);
		}
		return true;
	};
	this.renameEvent = function(puzzle, oldevent, newevent) {
		//TODO - urgh... editing too?
	};
	this.removeEvent = function(puzzle, event) {
		//TODO - urgh... editing too?
	};
	this.getTags = function() {
		//TODO - optimize the hell out of this!
		var availableTags = {};
		var tags;
		for(var i = 0; i < sessions.length; i++) {
			var times = sessions[i].times;
			for(var j = 0; j < times.length; j++) {
				tags = times[j].tags;
				for(var k = 0; k < tags.length; k++) {
					availableTags[tags[k]] = true;
				}
			}
		}
		tags = [];
		for(var tag in availableTags) {
			if(availableTags.hasOwnProperty(tag)) {
				tags.push(tag);
			}
		}
		tags.sort();
		return tags;
	};

	// Utility function to copy all the properties from oldObj into newObj
	function copyTo(oldObj, newObj) {
		for(var key in oldObj) {
			if(oldObj.hasOwnProperty(key)) {
				newObj[key] = oldObj[key];
			}
		}
	}
	var sessions = this.configuration.get('sessions', []);
	//transforming sessions (a JSON object) into an array of Sessions of Times
	try {
		var newSessions = [];
		for(i = 0; i < sessions.length; i++) {
			var sesh = new tnoodle.Session(this);
			copyTo(sessions[i], sesh);
			for(var j = 0; j < sesh.times.length; j++) {
				var newTime = new tnoodle.Time(0);
				copyTo(sesh.times[j], newTime);
				// JSON doesn't treat Infinity like a number, so we
				// have to cons it up ourselves.
				if(newTime.millis === null && newTime.penalty == "DNF") {
					newTime.millis = Infinity;
				}
				sesh.times[j] = newTime;
				newTime.setSession(sesh);
			}
			if(sesh.times.length > 0) {
				newSessions.push(sesh);
			}
		}
		sessions = newSessions;
	} catch(error) {
		alertException(error);
		//bummer
		sessions = [];
	}
	
	this.sessions = sessions;
	
	var config = this.configuration;
	var pendingSave = false;
	function bufferedSave() {
		pendingSave = false;
		config.set('sessions', sessions);
	}
	this.saveSessions = function() {
		if(pendingSave) {
			return;
		}
		pendingSave = true;
		setTimeout(bufferedSave, 500);
	};
	
	if(sessions.length === 0) {
		this.createSession("333", "");
	}
}