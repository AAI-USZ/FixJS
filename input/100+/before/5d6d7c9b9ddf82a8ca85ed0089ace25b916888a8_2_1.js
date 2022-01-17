function FileClient(serviceRegistry, filter) {
		var allReferences = serviceRegistry.getServiceReferences("orion.core.file"); //$NON-NLS-0$
		var _references = allReferences;
		if (filter) {
			_references = [];
			for(var i = 0; i < allReferences.length; ++i) {
				if (filter(allReferences[i])) {
					_references.push(allReferences[i]);
				}
			}
		}
		var _patterns = [];
		var _services = [];
		var _names = [];
		
		function _noMatch(location) {
			var d = new Deferred();
			d.reject(messages["No Matching FileService for location:"] + location);
			return d;
		}
		
		var _fileSystemsRoots = [];
		var _allFileSystemsService =  {
			fetchChildren: function() {
				var d = new Deferred();
				d.resolve(_fileSystemsRoots);
				return d;
			},
			createWorkspace: function() {
				var d = new Deferred();
				d.reject(messages["no file service"]);
				return d;
			},
			loadWorkspaces: function() {
				var d = new Deferred();
				d.reject(messages['no file service']);
				return d;
			},
			loadWorkspace: function(location) {
				var d = new Deferred();
				window.setTimeout(function() {
					d.resolve({
						Directory: true, 
						Length: 0, 
						LocalTimeStamp: 0,
						Name: messages["File Servers"],
						Location: "/",  //$NON-NLS-0$
						Children: _fileSystemsRoots,
						ChildrenLocation: "/" //$NON-NLS-0$
					});
				}, 100);
				return d;
			},
			search: _noMatch,
			createProject: _noMatch,
			createFolder: _noMatch,
			createFile: _noMatch,
			deleteFile: _noMatch,
			moveFile: _noMatch,
			copyFile: _noMatch,
			read: _noMatch,
			write: _noMatch
		};
				
		for(var j = 0; j < _references.length; ++j) {
			_fileSystemsRoots[j] = {
				Directory: true, 
				Length: 0, 
				LocalTimeStamp: 0,
				Location: _references[j].getProperty("top"), //$NON-NLS-0$
				ChildrenLocation: _references[j].getProperty("top"), //$NON-NLS-0$
				Name: _references[j].getProperty("Name")		 //$NON-NLS-0$
			};

			var patternString = _references[j].getProperty("pattern") || ".*"; //$NON-NLS-1$ //$NON-NLS-0$
			if (patternString[0] !== "^") { //$NON-NLS-0$
				patternString = "^" + patternString; //$NON-NLS-0$
			}
			_patterns[j] = new RegExp(patternString);			
			_services[j] = serviceRegistry.getService(_references[j]);
			_names[j] = _references[j].getProperty("Name"); //$NON-NLS-0$
		}
				
		this._getServiceIndex = function(location) {
			// client must specify via "/" when a multi file service tree is truly wanted
			if (location === "/") { //$NON-NLS-0$
				return -1;
			} else if (!location || (location.length && location.length === 0)) {
				// TODO we could make the default file service a preference but for now we use the first one
				return _services[0] ? 0 : -1;
			}
			for(var i = 0; i < _patterns.length; ++i) {
				if (_patterns[i].test(location)) {
					return i;
				}
			}
			throw messages['No Matching FileService for location:'] + location;
		};
		
		this._getService = function(location) {
			var i = this._getServiceIndex(location);
			return i === -1 ? _allFileSystemsService : _services[i];
		};
		
		this._getServiceName = function(location) {
			var i = this._getServiceIndex(location);
			return i === -1 ? _allFileSystemsService.Name : _names[i];
		};
	}