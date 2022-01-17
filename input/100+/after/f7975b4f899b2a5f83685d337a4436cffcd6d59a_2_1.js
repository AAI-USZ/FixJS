function(hostname, port, protocol) {
	var that = this;

	if(!hostname) {
		hostname = location.hostname;
		port = location.port;
		protocol = location.protocol;
	}
	if(!port) {
		port = "80";
	}
	if(!protocol) {
		protocol = "http:";
	}
	this.serverUrl = protocol + "//" + hostname + ":" + port;

	/**** Scramble server stuff ***/
	this.puzzlesUrl = this.serverUrl + "/puzzles/.json";
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

	this.showExt = function(title, scrambleRequest, password, ext, target) {
		var params = { scrambles: JSON.stringify(scrambleRequest) };
		if(password) {
			params.password = password;
		}
		tnoodle.postToUrl(that.viewUrl + encodeURIComponent(title) + '.' + ext, params, "POST", target);
	};
	this.showPdf = function(title, scrambleRequest, password, target) {
		that.showExt(title, scrambleRequest, password, 'pdf', target);
	};
	this.showZip = function(title, scrambleRequest, password, target) {
		that.showExt(title, scrambleRequest, password, 'zip', target);
	};
	
	this.loadPuzzles = function(callback, includeStatus) {
		var query = {};
		if(includeStatus) {
			query.includeStatus = 'true';
		}
		return tnoodle.retryAjax(callback, this.puzzlesUrl, query);
	};
	
	this.loadScramble = function(callback, puzzle, seed) {
		return this.loadScrambles(function(scrambles) {
			callback(scrambles[0]);
		}, puzzle, seed, 1);
	};
	var requestCount = 0;
	this.loadScrambles = function(callback, puzzle, seed, count) {
		var query = {};
		if(seed) { query.seed = seed; }
		if(!count) { count = 1; }

		// The backend lightly protects itself by not allowing more than 100
		// scrambles in a single request.
		assert(count <= 100);

		query[''] = encodeURIComponent(puzzle) + "*" + count;
		// Freaking Chrome seems to cache scramble requests if they're close enough
		// together, even if we POST. This forces it to not.
		query['showIndices'] = (requestCount++);
		var pendingLoadScrambles = tnoodle.retryAjax(function(scrambleRequests) {
			assert(!scrambleRequests.error);

			var scrambles = [];
			for(var i = 0; i < scrambleRequests.length; i++) {
				scrambles = scrambles.concat(scrambleRequests[i].scrambles);
			}
			if(tnoodle.FAKE_SCRAMBLE_DELAY) {
				setTimeout(callback.bind(null, scrambles), tnoodle.FAKE_SCRAMBLE_DELAY);
			} else {
				callback(scrambles);
			}
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
		return this.viewUrl + encodeURIComponent(puzzle) + ".png?" + tnoodle.toQueryString(query);
	};
	this.getPuzzleIconUrl = function(puzzle) {
		return this.viewUrl + encodeURIComponent(puzzle) + ".png?icon=true";
	};
	this.loadPuzzleImageInfo = function(callback, puzzle) {
		// callback must be a function(defaultPuzzleInfo)
		// where defaultPuzzleInfo.faces is a {} mapping face names to arrays of points
		// defaultPuzzleInfo.size is the size of the scramble image
		// defaultPuzzleInfo.colorScheme is a {} mapping facenames to hex color strings
		return tnoodle.retryAjax(callback, this.viewUrl + encodeURIComponent(puzzle) + ".json", null);
	};
	this.importScrambles = function(callback, url) {
		return tnoodle.retryAjax(callback, this.importUrl, { url: url });
	};
	
	var uploadForm = null;
	this.getUploadForm = function(onsubmit, onload) {
		// TODO - this can be implemented with HTML5 stuff instead
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
}