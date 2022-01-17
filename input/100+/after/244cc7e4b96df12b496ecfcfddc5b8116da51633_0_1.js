function() {
	
var exports = {};



/**
 * 
 * Constants
 * @namespace
 * @name Constants
 * @private
 * @memberOf GFS
 * 
 */
var Constants = {
		
		/**
		 * @private
		 * @memberOf Constants
		 */ 
		Images: {
			LOADING	: 'gfx/loading.gif',
			OK		: 'gfx/ok.png',
			ERROR	: 'gfx/error.png'
		},
		
		Selectors: {
			DOWNLOADING_LIST: '#downloading',
			RESULTS_COUNT	: '#resultsCount',
			RESULTS_LIST	: '#results',
			DOWNLOAD_BUTTONS: '#dlButtons input',
			QUERY_TEXT		: '#myText',
			MAX_DOWNLOADS	: '#maxDownloads',
			EXTENSIONS_LIST	: '#extensionsList',
			MAX_RESULTS		: '#maxResults'
		}
		
};
exports.Constants = Constants;


/**
 * 
 * Parser of remote open directories
 * @namespace
 * @name Parser
 * @private
 * @memberOf GFS
 * 
 */
var Parser = (function(){

	/**
	 * Parse content of dir layed out as a table with icons where 'alt' is [DIR] and [SND]
	 * ex: https://notendur.hi.is/shl1/birna/Arcade%20Fire/The%20Suburbs/
	 * or: http://simant.ru/pub/multimedia/mp3/%5B-=Foreign=-%5D/S/Slayer//2006-christ%20illusion/
	 * @private
	 * @memberOf Parser
	 */ 
	var DIR = (function(){
		
		function getElementsFromTable(table, path, query) {
			var ret = [];
			// get lines with img [SND] or [DIR]
			var snd = table.find('img[alt="[SND]"]');
			var dirs = table.find('img[alt="[DIR]"]');
			// get links in next columns
			snd.parents('td').next('td').find('a').each(function(i, a) {
				// url is either attr href (as in http://138678.activeboard.com/t42662121/index-of-publicmp3metallica/)
				// or pathname (as in https://notendur.hi.is/shl1/birna/Arcade%20Fire/The%20Suburbs/)
				var url = a.href;
				if (url.indexOf('chrome-extension') === 0)
					url = path + a.pathname;
				ret.push(Elements.create(url, a.text));
			});
			dirs.parents('td').next('td').find('a').each(function(i, a) {
				if (a.text !== 'Parent Directory')
					// add dir 
					ret.push(Elements.create(path + a.pathname, a.text, query));
			});
			return ret;
		}
		
		return { 
			getElements: function(data, query, path) {
				var links = $('img[alt="[DIR]"]', data);
				if (links.length) {
					// get parent table
					var table = links.parents('table');
					if (table.length)
						return getElementsFromTable(table, path, query);
				}
			}
		};
	})();
	

	/**
	 * Parse content of dir layed out as successive anchors
	 * (Apache 2, LiteSpeed Web Server)
	 * ex: http://bryanbryan.com/music/nope/Arcade%20Fire%20%5BDiscography%5D/2003%20-%20Arcade%20Fire/
	 * @private
	 * @name Parser#PRE
	 * @memberOf Parser
	 */ 
	var PRE = (function(){

		return { 
			getElements: function(data, query, path) {
				var ret = undefined;
				var links = $('a[href]', data).filter(function() {
				    return $.trim(this.text) === 'Parent Directory';
				});
				// get all following anchors except 'folder'
				links.nextAll('a[href!="folder.jpg"]').each(function(i, a) {
					ret = ret || [];
					ret.push(Elements.create(path + a.pathname, a.text, query));
				});
				return ret;
			}
		};
	})();


	/**
	 * Parse content of dir layed out as a unordered list (UL) of anchors
	 * (Apache/2.2.21, Proxad ?)
	 * ex: http://vindweb.nl/muziek/Metal/Slayer%20-%20MP3%20Discography%20(1983%20-%202009)/1994%20-%20Divine%20Intervention/
	 * @private
	 * @name Parser#UL
	 * @memberOf Parser
	 **/ 
	var UL = (function(){
		
		return {
			getElements: function(data, query, path) {
				var ret = undefined;
				var links = $('a[href]', data).filter(function() {
				    return $.trim(this.text) === 'Parent Directory';
				});
				// get all following anchors
				links.parent('LI').nextAll().children('A').each(function(i, a) {
					ret = ret || [];
					ret.push(Elements.create(path + a.pathname, a.text, query));
				});
				return ret;
			}
		};
	})();

	
	return {
		getElements: function(data, query, path) {
			return DIR.getElements(data, query, path)
			|| PRE.getElements(data, query, path)
			|| UL.getElements(data, query, path);
		}
	};
	
})(); // end of Parser




/**
 * 
 * Remote or local elements management
 * @namespace
 * @name Elements
 * @private
 * @memberOf GFS
 * 
 */
var Elements = (function() {
	
	var exports = {};
	
	/**
	 * Create object Directory
	 * @private
	 * @name createDir
	 * @memberOf Elements
	 * @function
	 * @param {String} url url of directory
	 * @param {String} name given name
	 * @param {Query} query query object for elements filtering
	 * @return {Directory} new Directory object
	 */
	function createDir(url, name, query) {
		
		var _elements = undefined;
		var _name = name;
		var _query = query;
		var _uri = new URI(url);
		var _checkBoxJElement = undefined;
		var _listJElement = undefined;
		var _imgJElement = undefined;
		var self = undefined;
		
		/**
		 * List and filter content of remote directory
		 * @private
		 * @name Directory#_explore
		 * @memberOf Directory
		 * @function
		 * @param {Search.Query} query filter query
		 * @param {Function} cb callback for end of exploration
		 * @return {Directory} self
		 */
		function _explore(query, cb) {
			console.log('fetching '+_uri.toString()+'...');
			// result
			var els = undefined;
			// xhr
			$.ajax({
				url: _uri.toString(),
				cache: false,
				dataType: "html",
				error: function() {
					console.log("url "+_uri.toString()+" could not be loaded");
					cb();
				},
				success: function(data) {			
					// compensate for a potential trimming of <html> and <body> tags by browser
					// (see http://stackoverflow.com/questions/8625928/parse-and-handle-dom-that-came-as-a-string-input)
					data = '<div>'+data+'</div>';
					
					// look for a title such as 'Index of ...'
					var h1 = $("TITLE:contains('Index of ')", data);
					if (h1.length) {
						var text = h1[0].textContent;
						_name = text.slice('Index of '.length);
						console.log('scanning '+_uri.toString()+'...');
						els = Parser.getElements(data, _query, _uri.toString());
						if (els) {
							console.log('got '+els.length+' results from '+_uri.toString());
						}
					}
					else {
						console.log('unable to parse content of '+_uri.toString());
					}
					cb(els);
				}
			});
			return this;
		};
		
		/**
		 * Display content of directory
		 * @private
		 * @name Directory#_expand
		 * @memberOf Directory
		 * @function
		 * @param {jQuery} target jQuery element for clickable directory name
		 * @return {Directory} self
		 */
		function _expand(target) {
			// does the dir path match request?
			if (_query.matchUri(_uri.toString())) {
				// display entire content of dir
				self.getElements(function(els) {
					if (!els) return;
					els.forEach(function(l) {
						var f = exports.create(l.getURL(), l.getURL(), _query);
						f.addToResults(_listJElement);
					});
					// show checkbox
					if (els.length)
						_checkBoxJElement.css('visibility','visible');
				});
			}
			else {
				// display only elements whose name matches request
				self.getElements(function(els) {
					var n=0;
					if (!els) return;
					els.forEach(function(l) {
						if (_query.matchName(l.getName()) && _query.matchExt(l.getName())) {
							var f = exports.create(l.getURL(), l.getURL(), _query);
							f.addToResults(_listJElement);
							n++;
						}
					});
					console.log(n+' elements of '+_name+' match request');
					// show checkbox
					if (n)
						_checkBoxJElement.css('visibility','visible');
				});
			}
			// next click collapses
			target.unbind("click").click(function(e) {
				e.stopPropagation();
				_collapse(target);
				return false;
			});
			return this;
		}
		
		/**
		 * Hide content of directory
		 * @private
		 * @name Directory#_collapse
		 * @memberOf Directory
		 * @function
		 * @param {jQuery} target jQuery element for clickable directory name
		 * @return {Directory} self
		 */
		function _collapse(target) {
			// remove children
			target.off('click');
			_listJElement.text('');
			// hide checkbox
			_checkBoxJElement.css('visibility','hidden').attr('checked', false);
			// next click will expand
			target.unbind("click").click(function(e) {
				e.stopPropagation();
				_expand(target);
				return false;
			});
			return this;
		}
		
		
		/**
		 * Select directory in list
		 * @private
		 * @name Directory#_select
		 * @memberOf Directory
		 * @function
		 * @param {jQuery} jel jQuery checkbox element
		 */
		function _select(jel) {
			jel.data('myObject', self).attr('checked', true);
			_listJElement.find("input[type='checkbox']")
				.attr('checked', true).change();
		}
		
		/**
		 * Unselect directory in list
		 * @private
		 * @name Directory#_unselect
		 * @memberOf Directory
		 * @function
		 * @param {jQuery} jel jQuery checkbox element
		 */
		function _unselect(jel) {
			jel.removeData('myObject').attr('checked', false);
			_listJElement.find("input[type='checkbox']")
				.attr('checked', false).change();
		}

		/**
		 * Directory
		 * @name Directory
		 * @memberOf Elements
		 */
		function Directory() {};
		
		Directory.prototype = {
				
				/**
				 * Return URL of directory
				 * @public
				 * @name Directory#getURL
				 * @function
				 * return {String} URL of directory
				 */
				getURL: function() {
					return _uri.toString();
				},
				
				/**
				 * Return name of directory
				 * @public
				 * @name Directory#getName
				 * @function
				 * @return {String} URL of directory
				 */
				getName: function() {
					return _name;
				},
				
				/**
				 * Retrieve elements of directory
				 * @public
				 * @name Directory#getElements
				 * @function
				 * @param {Function} cb callback
				 */
				getElements: function(cb) {
					if (!_elements) {
						// status=loading
						_imgJElement.attr('src', Constants.Images.LOADING)
							.css('visibility', 'visible');
						// scan remote directory
						_explore(_query, function(els) {
							_elements = els;
							if (!els) {
								// status=error
								_imgJElement.attr('src', Constants.Images.ERROR);
							}
							else {
								// status=ok
								_imgJElement.attr('src', Constants.Images.OK);								
							}
							if (cb)
								cb(els);
						}); 
					}
					else
						cb(_elements);
				},
				
				/**
				 * Display directory in results list
				 * @public
				 * @name Directory#addToResults
				 * @function
				 * @param {DOMElement} parent parent DOM element
				 * @return {DOMElement} new link DOM element
				 */
				addToResults: function(parent) {
					var el = $("<input type='checkbox'></input><img width=15 height=15></src><a href='#'>" 
							+ _uri.toString() + "</a>" + " : " 
							+ _name + "<br><div></div>");
					// prepend with a checkbox
					_checkBoxJElement = el.first()
						.change(function() {
							if (el.attr('checked'))
								_select(_checkBoxJElement);
							else
								_unselect(_checkBoxJElement);
						})
						.css('visibility','hidden');
					// status image
					_imgJElement = el.eq(1)
						.css('visibility','hidden');
					// click expands directory content
					var a = el.eq(2);
					a.unbind("click").click(function(e) {
						e.stopPropagation();
						_expand(a);
						return false;
					});
					// container for sub-elements
					_listJElement = el.last()
						.css('padding-left', '2em');
					el.appendTo(parent);
					return _listJElement;
				},
				
				/**
				 * Stub: dirs cannot be saved
				 * @public
				 * @name Directory#saveToFile
				 * @function
				 * @param {FileSystem} fs target filesystem
				 * @param {Function} cb callback for end of write
				 */
				saveToFile: function(fs, cb) {
					_checkBoxJElement.attr('checked', false);
					if (cb)
						cb(false);
				}
		};
		
		return self = new Directory();
	}
	
	
	/**
	 * Create object File
	 * @public
	 * @name createFile
	 * @function
	 * @memberOf Elements
	 * @param {String} url url of file
	 * @param {Entry} entry optional local FS file entry
	 * @return {File} new File object
	 */
	function createFile(url, entry) {
		
		// extract file name from url
		var _uri = new URI(url);
		// FIXME: when _uri contains a query, filename returns ""
		var _name = unescape(_uri.filename());
		var _listJElement = undefined;
		var _localFSEntry = entry;
		var _statusJElement = undefined;
		var _localJElement = undefined;
		var file = undefined;
		
		/**
		 * Select file in list
		 * @private
		 * @name File#_select
		 * @memberOf File
		 * @function
		 * @param {jQuery} jel jQuery checkbox element
		 */
		function _select(jel) {
			jel.data('myObject', file).attr('checked', true);
		}
		
		/**
		 * Unselect file in list
		 * @private
		 * @name File#_unselect
		 * @memberOf File
		 * @function
		 * @param {jQuery} jel jQuery checkbox element
		 */
		function _unselect(jel) {
			jel.removeData('myObject').attr('checked', false);
		}
		
		/**
		 * File
		 * @name File
		 * @memberOf Elements
		 */
		function File() {};
		
		File.prototype = {
				
				/**
				 * Return URL of file
				 * @public
				 * @name File#getURL
				 * @function
				 * @return {String} URL of file
				 */
				getURL: function() {
					return _uri.toString();
				},
				
				
				/**
				 * Return URL of file on the local filesystem
				 * @public
				 * @name File#getLocalURL
				 * @function
				 * @return {String} local URL of file
				 */
				getLocalURL: function() {
					return _localFSEntry.toURL();
				},
				
				
				/**
				 * Return name of file
				 * @public
				 * @name File#getName
				 * @function
				 * @return {String} name of file
				 */
				getName: function() {
					return _name;
				},
				
				
				/**
				 * Display file in DOM as a checkbox
				 * @public
				 * @name File#addToResults
				 * @function
				 * @param {DOMElement} parent parent DOM element
				 * @return {DOMElement} new checkbox DOM element
				 */
				addToResults: function(parent) {
					var el = $("<input type='checkbox'>"
							+ _name + "</input><br>");
					// manage select/unselect
					el.change(function(e) {
						if (el.attr('checked'))
							_select(_listJElement);
						else
							_unselect(_listJElement);
					});
					el.appendTo(parent);
					return _listJElement = el.first();
				},
				
				
				/**
				 * Display file as a draggable link to local file
				 * @public
				 * @name File#displayAsLink
				 * @function
				 * @param {DOMElement} parent parent DOM element
				 * @return {DOMElement} new link DOM element
				 */
				displayAsLink: function(parent) {
					_localJElement = $("<input type='checkbox'></input><a href='"+this.getLocalURL()+"'"
							+ " class='dragout' draggable='true'"
							+ ' data-downloadurl="application/octet-stream:'+escape(_name)+':'+this.getLocalURL()+'">'
							+ _name + "</a><br>");
					// manage select/unselect
					var cbox = _localJElement.first();
					cbox.change(function(e) {
						if (cbox.attr('checked'))
							_select(cbox);
						else
							_unselect(cbox);
					});
					// manage click
					var self = this;
					var a = _localJElement.eq(1);
					a.unbind("click").click(function() {
						console.log('opening: '+self.getName()+'...');
						window.open(self.getLocalURL(), self.getName());
						return false;
					});
					// manage drag out
					a[0].addEventListener('dragstart', function(evt) {
						evt.dataTransfer.setData('DownloadURL', this.getAttribute('data-downloadurl'));
						console.log('dragging: '+_name+'...');
					}, false);
					_localJElement.appendTo(parent);
					return this;
				},
				
				
				/**
				 * Remove local file and link
				 * @public
				 * @name File#removeLink
				 * @function
				 */
				removeLink: function() {
					// remove from list
					_localJElement.remove();
					// remove from local store
					_localFSEntry.remove(function() {
						console.log('file '+_localFSEntry.name+' removed');
					}, function(e) {
						console.log('error removing '+_localFSEntry.name+': '+LocalStorage.getFileErrorMsg(e));
					});
					return this;
				},
				
				
				/**
				 * Display file with its download status
				 * @public
				 * @name File#displayAsDownloading
				 * @function
				 * @param {DOMElement} parent parent DOM element
				 * @return {Function} progress info update function
				 */
				displayAsDownloading: function(parent) {
					_statusJElement = $("<input type='checkbox'></input><a>"+_name+"   </a><a></a><br>");
					// checkbox is invisible, only for left alignment
					_statusJElement.first().css('visibility', 'hidden');
					_statusJElement.appendTo(parent);
					// return status update function
					return function(status) {
						_statusJElement.eq(2).html(status);
					};
				},	
				
				
				/**
				 * Remove downloading file
				 * @public
				 * @name File#removeDownloading
				 * @function
				 */
				removeDownloading: function() {
					// remove from list
					_statusJElement.remove();
					return this;
				},
				
				
				/**
				 * Start download of file
				 * @public
				 * @name File#download
				 * @function
				 * @param {Function} end callback for end of download
				 * @param {Function} update callback to update download status
				 * @return {File} self
				 */
				download: function(end, update) {
					var req = new XMLHttpRequest();
					req.open('GET', _uri.toString(), true);
					// FIXME: selecting type 'blob' triggers 'onload' with response=null 
					req.responseType = 'arraybuffer';
					req.onprogress = function(event) {
						var text = '';
						switch (req.readyState) {
						case 1: 
							text = 'Open...';
							break;
						case 2:
							text = 'Sent...';
							break;
						case 3:
							text = (new Number(100*event.loaded/event.total)).toFixed(0)+'%';
							break;
						case 4:
							text = 'Loaded ('+event.loaded+'B)';
							break;
						default:
							break;
						}
						if (update)
							update(text);
						if (req.status != 200) 
							throw 'file download failed for '+_uri.toString();
					};
					req.onload = function() {
						if ((this.status === 200) && end) {
							var bb = new BlobBuilder();
						    bb.append(this.response);
						    end(bb.getBlob('application/octet-stream'));
						}
					};
					console.log('downloading: '+_uri.toString()+'...');
					req.send();
					return this;
				},
				
				
				/**
				 * Download and save file to a given filesystem
				 * @public
				 * @name File#saveToFile
				 * @function
				 * @param {FileSystem} fs target filesystem
				 * @param {Function} cb callback for end of write
				 * @return {File} self
				 */
				saveToFile: function(fs, cb) {
					var self = this;
					LocalStorage.createFile(
							fs,
							_name,
							function(entry) {
								_localFSEntry = entry;
								self.download(
										function(data) {
											console.log('downloaded '+data.size+'B');
											_unselect(_listJElement);
											LocalStorage.writeToFile(
													entry,
													data,
													function(res) {
														if (cb)
															cb(res, self);
													});		
										},
										// display as downloading and get update function
										self.displayAsDownloading($(Constants.Selectors.DOWNLOADING_LIST)[0])
								);
							}
					);
					return this;
				},
				
				
				/**
				 * Read content of local file if available
				 * @public
				 * @name File#readFile
				 * @function
				 * @param {Function} cb callback for end of reading
				 * @return {File} self
				 */
				readFile: function(cb) {
					if (!_localFSEntry)
						if (cb)
							cb(false);
					_localFSEntry.file(function(file) {
						var reader = new FileReader();
						reader.onloadend = function(e) {
							if (cb)
								cb(true, this.result);
						};
						reader.onerror = function(error) {
							console.log('failed to open file '+_localFSEntry.name+': '+LocalStorage.getFileErrorMsg(error));
							if (cb)
								cb(false);
						};
						console.log('opening file '+_localFSEntry.name+'...');
						reader.readAsBinaryString(file);
					});
					return this;					
				},
				
		};
		return file = new File();
	}
	
	
	exports.create = function(url, name, query) {
		if (url[url.length-1] === '/') {
			// create dir 
			return createDir(url, name, query);
		}
		else {
			// create file
			return createFile(url, name);
		}
	};
	exports.createFile = createFile;
	exports.createDirectory = createDir;
	
	return exports;
	
})(); // end of Elements

exports.Elements = Elements;




/**
 * 
 * Search operations
 * @namespace
 * @name Search
 * @memberOf GFS
 * 
 */
var Search = (function() {

	var exports = {};

	
	// extensions
	// TODO add extensions
	var extensions = [
        ['wma', 'mp3', 'ogg', 'm4a', 'm4p', 'flac', 'alac'],
	    ['pdf', 'doc', 'xls', 'ppt', 'pps', 'docx', 'xlsx', 'pptx', 'ppsx', 'odt', 'ods', 'odp'],
		['gp3', 'gp4', 'gp5', 'gpx', 'gtp', 'ptb', 'tef', 'ly']
	];
	var _extIndex = 0;
	var _extstr = "";
	
	
	/**
	 * Init the drop-down list of file extensions
	 * @public
	 * @name Search#initExtensionsList
	 * @function
	 * @memberOf Search
	 */
	exports.initExtensionsList = function() {
		
		// fill extensions list
		var el = $(Constants.Selectors.EXTENSIONS_LIST);
		el.html("");
		var i, exts, opt, extstr;
		for (i=0; i<extensions.length; ++i) {
			exts = extensions[i];
			extstr = (exts.length > 3) ?
				  exts.slice(0,3).join(', ')+'...'
				: exts.join(', ');
			opt = $("<option value="+i+">"+extstr+"</option>");
			opt.appendTo(el);
		}
		el.change(function() {
			_extIndex = el.val();
			_extstr = extensions[_extIndex].join('|');
			console.log('selected extensions '+_extstr);
		}).change();
	};

	
	// blacklist
	var blacklist = [  'mp3mirror.com'
	                 , 'vmp3.eu'
	                 , 'mp3toss.com'
	                 , 'listen77.com'
	                 , 'mmusicz.com'
	                 , 'openwebindex.com'
	                 , 'kbjinteractive.com'
	                 , 'dogpile.com'
	                 , 'godsinamnesia.com'
	                 , 'hotpixels.eu'
	                 , 'findallmp3.com'
	                 , 'mp3blogs.com'
	                 , 'writeups.info'
	                 , 'registryquick.net'
	];
	// TODO greylist are e.g password-protected sites
	var greylist = [     'wallywashis.name'
	                   , 'pipl.com'
	];
	var _blstr = (blacklist.length || greylist.length) ?
			  ' -site:' + blacklist.concat(greylist).join(' -site:')
			: '';
			  
			  
	// results set
	var _resultsSize = 8;
	var _totalHosts = 0;
	var RESULTS_SIZE_STEP = 8;
	var _page = 0;
	
	
	/**
	 * Increase size of search results list
	 * @public
	 * @name Search#incResultsSize
	 * @function
	 * @memberOf Search
	 */
	exports.incResultsSize = function() {
		_resultsSize += RESULTS_SIZE_STEP;
		$(Constants.Selectors.MAX_RESULTS).val(_resultsSize);
	};
	
	
	/**
	 * Decrease size of search results list
	 * @public
	 * @name Search#decResultsSize
	 * @function
	 * @memberOf Search
	 */
	exports.decResultsSize = function() {
		if (_resultsSize > RESULTS_SIZE_STEP)
			_resultsSize -= RESULTS_SIZE_STEP;
		$(Constants.Selectors.MAX_RESULTS).val(_resultsSize);
	};
	
	
	/**
	 * Number of results from the last query
	 * @private
	 * @name Search#_resultsCount
	 * @function
	 * @memberOf Search
	 */
	var _resultsCount = (function(){
		
		var _resultsNum = 0;
		return {
			set: function(n) {
				_resultsNum = n;
				$(Constants.Selectors.RESULTS_COUNT).text('Results: '+_resultsNum);
				return _resultsNum;
			},
			get: function() {
				return _resultsNum;
			},
		};
	})();
	
	
	/**
	 * Callback for end of google search
	 * Populates results list
	 * @private
	 * @name Search#onSearchComplete
	 * @function
	 * @memberOf Search
	 */
	function onSearchComplete(sc, searcher)  {
		
		if (   !searcher.results 
			|| !searcher.results.length	)
			return;
		
		_resultsCount.set(_resultsCount.get() + searcher.results.length);
		searcher.results.forEach(function(res) {
			var dir = Elements.createDirectory(
					res.unescapedUrl, 
					res.title, 
					createQuery($(Constants.Selectors.QUERY_TEXT).val(), extensions[_extIndex]));
			dir.addToResults($(Constants.Selectors.RESULTS_LIST)[0]);
		});
		
		_totalHosts += searcher.results.length;
		if(_totalHosts < _resultsSize) {
			_page++;
			searcher.gotoPage(_page);
		}
	}
	
	
	/**
	 * Create a query object
	 * @private
	 * @name Search#createQuery
	 * @function
	 * @memberOf Search
	 * @param {String} text query text
	 * @param {Array} exts array of looked for extensions
	 * @returns {Search.Query} new query object
	 */
	function createQuery(text, exts) {
		var _crit = text.toLowerCase().split(' ');
		function _match(str) {
			var res = true;
			// every element of the _crit array must be part of the string
			_crit.forEach(function(qs) {
				if (str.toLowerCase().indexOf(qs) === -1)
					res = false;
			});
			return res;
		}
		return {
			toString: function() {
				return _crit.join(',');
			},
			matchUri: function(uri) {
				return _match(escape(uri));
			},
			matchName: function(str) {
				return _match(str);
			},
			matchExt: function(str) {
				var pt = str.lastIndexOf('.');
				if (pt === -1)
					return false;
				return $.inArray(str.slice(pt+1), exts) !== -1;
			}
		};
	}
	

	/**
	 * Start a search with Google
	 * @public
	 * @name Search#start
	 * @function
	 * @memberOf Search
	 */
	exports.start = function() {
		// Create a search control
		var searchControl = new google.search.SearchControl();
		// Add in a full set of searchers
		searchControl.addSearcher(new google.search.WebSearch());
		searchControl.setResultSetSize(google.search.Search.LARGE_RESULTSET);
		
		// tell the searcher to draw itself and tell it where to attach
		searchControl.draw(document.getElementById("searchcontrol"));
		searchControl.setSearchCompleteCallback(this, onSearchComplete);
		//  searchControl.setNoHtmlGeneration();
		//  searchControl.setSearchStartingCallback(this, OnSearchStarting);
		
		//!! dont use 'size' in request or no answer ...
		var request = "-inurl:(htm|html|php) +\"index of\" +\"last modified\" +\"parent directory\" +description "
			+ ' +('+_extstr+')' + ' +\"' + $(Constants.Selectors.QUERY_TEXT).val() + '\"'
			+ ' ' + _blstr;
		console.log('send request ' + request);
		_page = 0;
		searchControl.execute(request);
	};
	

	/**
	 * Clear the query field
	 * @public
	 * @name Search#clearQuery
	 * @function
	 * @memberOf Search
	 */
	exports.clearQuery = function() {
		$(Constants.Selectors.QUERY_TEXT).val('');
	};

	
	/**
	 * Clear the results list
	 * @public
	 * @name Search#clear
	 * @function
	 * @memberOf Search
	 */
	exports.clear = function() {
		console.log('clearing '+$(Constants.Selectors.RESULTS_LIST+' > a').length+' elements');
		$(Constants.Selectors.RESULTS_LIST).empty();
		_resultsCount.set(0);
		_totalHosts = 0;
	};
	
	return exports;
	
})(); // end of Search

exports.Search = Search;




/**
 * 
 * Operations on downloaded files
 * @namespace
 * @name Download
 * @public
 * @memberOf GFS
 * 
 */
var Download = (function() {
	
	var exports = {};
	
	
	// number of concurrent downloading files
	var _maxDownloads = 3;
	
	/**
	 * Increase the number of simultaneous downloads
	 * @public
	 * @name Download#incMaxDownload
	 * @function
	 * @memberOf Download
	 */
	exports.incMaxDownload = function() {
		_maxDownloads++;
		$(Constants.Selectors.MAX_DOWNLOADS).val(_maxDownloads);
		
	};
	

	/**
	 * Decrease the number of simultaneous downloads
	 * @public
	 * @name Download#decMaxDownload
	 * @function
	 * @memberOf Download
	 */
	exports.decMaxDownload = function() {
		if (_maxDownloads > 1)
			_maxDownloads--;
		$(Constants.Selectors.MAX_DOWNLOADS).val(_maxDownloads);
	};
	
	
	/** 
	 * Returns selected elements in a list
	 * @private
	 * @name Download#_getSelectedElements
	 * @function
	 * @memberOf Download
	 * @param {jQuery} list jQuery element for the target list
	 * @return {Array} array of selected elements
	 */
	function _getSelectedElements(list) {
		return list.find("input:checked").map(function(i, el) {
			return $(el).data('myObject');
		}).get();
	}
	

	var _done = 0;	
	function _downloadNext(fs, files, idx, step) {
		if (_done === files.length)
			return;
		var file = files[idx];
		if (!file)
			return;
		file.saveToFile(fs, function(res, f) {
			// end of file write
			if (res) {
				// success
				f.displayAsLink($(Constants.Selectors.DOWNLOADING_LIST)[0]);
				f.removeDownloading();
				_done++;
				_downloadNext(fs, files, idx+step, step);
			}
			else {
				// download failed
				_done++;
				_downloadNext(fs, files, idx+step, step);
			}
		});
	};
	
	
	/**
	 * Start download of selected files
	 * @public
	 * @name Download#start
	 * @function
	 * @memberOf Download
	 */
	exports.start = function() {
		
		// get storage directory
		LocalStorage.getFileSystem(function(fs) {
			// download each file
			var files = _getSelectedElements($(Constants.Selectors.RESULTS_LIST));
			console.log("downloading "+ files.length +" files...");
			_done = 0;
			for (var i=0; i<_maxDownloads && i<files.length; i++)
				_downloadNext(fs, files, i, _maxDownloads);
		});
	};
	

	/**
	 * Select all downloaded files
	 * @private
	 * @name Download#select_all_download
	 * @function
	 * @memberOf Download
	 */
	function select_all_download() {
		var cbs = $(Constants.Selectors.DOWNLOADING_LIST).find("input[type='checkbox']");
		if (!cbs.size())
			return;
		cbs.attr('checked', true).change();
		$('input[type="button"][name="selectDlButton"]')
			.unbind("click").click(unselect_all_download)
			.val('unselect all');
	}
	exports.selectAll = select_all_download;
	

	/**
	 * Unselect all downloaded files
	 * @private
	 * @name Download#unselect_all_download
	 * @function
	 * @memberOf Download
	 */
	function unselect_all_download() {
		$(Constants.Selectors.DOWNLOADING_LIST).find("input[type='checkbox']")
			.attr('checked', false).change();
		$('input[type="button"][name="selectDlButton"]')
			.unbind("click").click(select_all_download)
			.val('select all');
	}
	
	
	/**
	 * Removes selected files
	 * @public
	 * @name Download#clear
	 * @function
	 * @memberOf Download
	 */
	exports.clear = function() {
		// remove selected files
		var files = $(Constants.Selectors.DOWNLOADING_LIST+' input:checked');
		console.log("removing "+ files.size() +" files...");
		files.each(function(i, el) {
			$(el).data('myObject').removeLink();
		});
		unselect_all_download();
	};
	
	
	/**
	 * Make a zip file out of selected files
	 * @public
	 * @name Download#zip
	 * @function
	 * @memberOf Download
	 */
	exports.zip = function() {
		var els = _getSelectedElements($(Constants.Selectors.DOWNLOADING_LIST));
		if (!els.length)
			return;
		var zip = new JSZip();
		var done = 0;
		console.log(els.length+' elements selected');
		// disable dl actions
		var buttons = $(Constants.Selectors.DOWNLOAD_BUTTONS);
		buttons.attr('disabled',true);
		var zipb = buttons.filter('input[name=zipDlButton]');
		zipb.val('archiving...');

		// archive all elements
		els.forEach(function(el) {
			// read content
			el.readFile(function(res, content) {
				console.log('file '+el.getName()+' length='+content.length);
				++done;
				if (!res) {
					// read failed
					return;
				}
				// success
				zip.file(
						  el.getName()
						, content
						, {base64: false, binary: true}
				);
				// free buffer
				content = null;
				if (done === els.length) {
					// zip is complete
					LocalStorage.getFileSystem(function(fs) {
						LocalStorage.createFile(
								fs,
								'archive.zip',
								function(entry) {
									// get zip binary content
									var zipdata = zip.generate({base64: false});
									console.log('zip len='+zipdata.length);
									// transform binary string to ArrayBuffer
									// cf http://stackoverflow.com/questions/7760700/html5-binary-file-writing-w-base64
									var ab = new ArrayBuffer(zipdata.length);
									var ia = new Uint8Array(ab);
									for (var i = 0; i < zipdata.length; i++) {
										ia[i] = zipdata.charCodeAt(i);
									}
									// Create a new Blob and write it
									var bb = new BlobBuilder(); // Note: window.WebKitBlobBuilder in Chrome 12.
									bb.append(ab);
									LocalStorage.writeToFile(
											entry,
											bb.getBlob('application/octet-stream'),
											function(res) {
												// free buffer
												zipdata = null;
												ab = null;
												// reenable dl buttons
												buttons.attr('disabled',false);
												zipb.val('zip');
												if (res) {
													// dl zip
													window.open(entry.toURL());
												}
									});
								}
						);
					});
				}
			});
		});
	};
	
	return exports;
	
})(); // end of Download

exports.Download = Download;




/**
 * 
 * Operations on files from local storage
 * @namespace
 * @name LocalStorage
 * @public
 * @memberOf GFS
 * 
 */
var LocalStorage = (function() {
	
	var exports = {};
	
	
	/**
	 * Returns error message
	 * @public
	 * @name LocalStorage#getFileErrorMsg
	 * @function
	 * @memberOf LocalStorage
	 * @param {Number} e local storage error code
	 * @return {String} plain text error message
	 */
	var getFileErrorMsg = function(e) {
		switch (e.code) {
		case FileError.QUOTA_EXCEEDED_ERR:
			return 'QUOTA_EXCEEDED_ERR';
		case FileError.NOT_FOUND_ERR:
			return 'NOT_FOUND_ERR';
		case FileError.SECURITY_ERR:
			return 'SECURITY_ERR';
		case FileError.INVALID_MODIFICATION_ERR:
			return 'INVALID_MODIFICATION_ERR';
		case FileError.INVALID_STATE_ERR:
			return 'INVALID_STATE_ERR';
		default:
			return 'Unknown Error';
		};
	};
	exports.getFileErrorMsg = getFileErrorMsg;
	
	
	/**
	 * Returns local storage file system handle
	 * @public
	 * @name LocalStorage#getFileSystem
	 * @function
	 * @memberOf LocalStorage
	 * @return {LocalFileSystem} local file system
	 */
	var getFileSystem = (function() {
		
		// singleton instance
		var _fs = undefined;
		return function(cb) {
			if (_fs) {
				if (cb)
					cb(_fs);
			}
			else {
				// Note: The file system has been prefixed as of Google Chrome 12:
				window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
				window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder;
				
				window.webkitStorageInfo.requestQuota(
						PERSISTENT,
						500*1024*1024,
						function(grantedBytes) {
							window.requestFileSystem(
									PERSISTENT,
									grantedBytes,
									function(fs) {
										console.log('acquired filesystem: ', fs);
										_fs = fs;
										if (cb)
											cb(_fs);
									},
									function(e) {
										console.log('filesystem error: ', e);
										alert('filesystem not accessible!');
									}
							);
						}, 
						function(e) {
							console.log('requestQuota error', e);
						}
				);
			}
		};
	})();
	exports.getFileSystem = getFileSystem;
	
	
	/**
	 * Returns all files from local file system
	 * @public
	 * @name LocalStorage#getAllFiles
	 * @function
	 * @memberOf LocalStorage
	 * @param {Function} callback operation for file entries array
	 */
	exports.getAllFiles = function(cb) {
		
		getFileSystem(function(fs) {
			
			var dirReader = fs.root.createReader();
			var entries = [];
			
			// Call the reader.readEntries() until no more results are returned.
			var readEntries = function() {
				dirReader.readEntries(function(results) {
					var i;
					if (!results.length) {
						// call cb with array of entries
						if (cb)
							cb(entries);
					} else {
						// results is an EntryArray != regular Array
						for (i=0; i<results.length; ++i) {
							entries.push(results[i]);
						}
						readEntries();
					}
				}, 
				function(e) {
					console.log('error listing store fs: '+getFileErrorMsg(e));
				});
			};
			readEntries(); // Start reading dirs.
		});
	};
	
	
	/**
	 * Create a new file in given file system
	 * @public
	 * @name #createFile
	 * @function
	 * @memberOf LocalStorage
	 * @param {String} name name of file
	 * @param {Function} callback for end of creation
	 */
	exports.createFile = function(fs, name, cb) {
		fs.root.getFile(
				name,
				{create: true, exclusive: false},
				function(entry) {
					console.log('created file '+entry.fullPath);
					if (cb)
						cb(entry);
				},
				function(error) {
					console.log('failed to create file '+name+': '+getFileErrorMsg(error));
				}
		);
		return fs;
	};
	
	
	/**
	 * Write data to file
	 * @public
	 * @name #writeToFile
	 * @function
	 * @memberOf LocalStorage
	 * @param {FileEntry} entry file entry
	 * @param {Blob} data binary data
	 * @param {Function} callback for end of write
	 */
	exports.writeToFile = function(entry, data, cb) {
		// Create a FileWriter object for our FileEntry
		entry.createWriter(
				function(fileWriter) {
					fileWriter.onwriteend = function(e) {
						console.log('write completed for '+entry.name);
						if (cb)
							cb(true);
					};
					fileWriter.onerror = function(error) {
						console.log('error writing '+entry.name+': ' + error.toString());
						if (cb)
							cb(false);
					};
					fileWriter.write(data); //bb.getBlob('application/octet-stream'));
				},
				function(error) {
					console.log('failed to create writer for file '+entry.name+': '+getFileErrorMsg(error));
					if (cb)
						cb(false);
				}
		);
		return entry;
	};
	
	
	return exports;
	
})(); // end of LocalStorage

exports.LocalStorage = LocalStorage;


return exports;

}