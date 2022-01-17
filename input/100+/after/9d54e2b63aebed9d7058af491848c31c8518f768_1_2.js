function ($) {

	"use strict";



	/*

	 * ============================================================================================

	 * 

	 * VARIABLES DEFINITION

	 * note that this is one long var statement so commas are required after each definition.

	 * 

	 * ============================================================================================

	 */

	var 

	

	/**

	 * Calls console.log without throwing errors if console is unavailable.

	 */

	log = function () {

		try {

			window.console.log.apply(window.console, arguments);

		} catch (err) {}

	},

	

	defaults = {

		forceHTML5: false,

		swfpath: './media/swf/',

		swfname: 'VimeoSubtitlePlayer.swf',

		swfupdater: 'expressInstall.swf',

		swfminversion: "10.0.0",

		className: 'websubs',

		video_id: null,

		autoplay: false,

		allowFullScreen: true,

		allowScriptAccess: 'always',

		wmode: 'window',

		bgcolor: '0x000000',

		subtitles_list: null,

		froogaloop_url: 'http://a.vimeocdn.com/js/froogaloop2.min.js'

	},



	isiPad = window.navigator.userAgent.match(/iPad/i) !== null,



	/*

	 * Options object 

	 */

	o = null,



	/*

	 * The HTML Element (iframe) 

	 */

	el = null,



	/*

	 * reference to the methods.html or methods.swf object, depending on the target platform 

	 */

	controller = null,



	/*

	 * unique ID for embedding flash via swfobject. (If the original iframe has an ID, that one used.) 

	 */

	id = null,



	/*

	 * the iframe src

	 */

	src = null,



	/*

	 * the iframe width

	 */

	width = null,



	/*

	 * the iframe height

	 */

	height = null,



	/*

	 * a DIV element we create as a wrapper for either the swf or the subtitle textfield

	 */

	div = null,



	/**

	 * properties of the options object that will be used as params for the swf object. 

	 */

	allowedParams = 'play,loop,menu,quality,scale,salign,wmode,bgcolor,base,swliveconnect,flashvars,devicefont,allowscriptaccess,seamlesstabbing,allowfullscreen,allownetworking',



	/**

	 * properties of the options object that will be used as attributes for the swf object. 

	 */

	allowedAttribs = 'id,name,class,align',



	/**

	 * properties of the options object that are used for internal purpose and should not be passed as flashvars 

	 */

	internalOptions = 'swfpath,swfname,swfupdater,swfminversion,classname',



	/**

	 * Methods defined in the swf and made available via ExternalInterface.addCallback()

	 */

	swfmethods = 'play,pause,stop,isReady,isPlaying,isPaused,seekTo,subtitles,list',



	/**

	 * Takes the options object and returns a new object that contains only those properties that are not listed as allowed params or attributes.

	 * @param {} Options object

	 * @returns {} flashvars object

	 */

	flashvars = function (obj) {

		var r = {},

			prop, p;

		for (prop in obj) {

			if (obj.hasOwnProperty(prop)) {

				p = prop.toLowerCase();

				if (!internalOptions.match(p) && !allowedParams.match(p) && !allowedAttribs.match(p)) {

					r[prop] = obj[prop];

				}

			}

		}

		return r;

	},



	/**

	 * Takes the options object and returns a new object that contains only those properties that are listed as allowed swf params.

	 * @param {} Options object

	 * @returns {} flashvars object

	 */

	params = function (obj) {

		var r = {},

			prop;

		for (prop in obj) {

			if (obj.hasOwnProperty(prop)) {

				if (allowedParams.match(prop.toLowerCase())) {

					r[prop] = obj[prop];

				}

			}

		}

		return r;

	},



	/**

	 * Takes the options object and returns a new object that contains only those properties that are listed as allowed swf attributes.

	 * @param {} Options object

	 * @returns {} flashvars object

	 */

	attribs = function (obj) {

		var r = {},

			prop;

		for (prop in obj) {

			if (obj.hasOwnProperty(prop)) {

				if (allowedAttribs.match(prop.toLowerCase())) {

					r[prop] = obj[prop];

				}

			}

		}

		return r;

	},

	

	/**

	 * swf init gets called 3-4 times if we do not set a flag and exit manually.

	 * Since I do not know why the multiple calls occur, this flag is a workaround.

	 */

	initialized = false,



	

	/*

	 * ============================================================================================

	 * 

	 * PLUGIN METHODS

	 * 

	 * We actually only have an init method and two objects (htmlController, swfController)

	 * So basically this architecture is pure shit as it violates any jquery plugin paradigm. 

	 * Apparently it works well so far, but it will fail if we want better control via the jquery plugin.

	 * TODO: restructure the whole thing. Have the plugin methods object behave as an interface/facade, make both the flash and html version understand the same commands and take them out of the methods object itself. 

	 * ============================================================================================

	 */

	

	methods = {

		//-----------------------------------------------------------

		// init

		// Here we do some validation work, define some basic vars nad decide whether to use the flash or the html5 version.

		//-----------------------------------------------------------

		init: function (options) {

			var args = arguments;



			return $(this).each(function (i) {

				src = $(this).attr('src');

				id = $(this).attr('id') || 'websubs_' + ($.fn.websubs.c += 1);



				if (!src.match(/api=1/)) {

					src += (src.match(/\?/) ? '&' : '?') + 'api=1';

				}

				if (!src.match(/player_id=/)) {

					src += (src.match(/\?/) ? '&' : '?') + 'player_id=' + id;

				}

				if (src !== $(this).attr('src')) {

					$(this).attr('src', src);

				}



				width = $(this).width();

				height = $(this).height();



				el = $(this);

				el.attr('id', id);



				var useHTML5 = (defaults.forceHTML5 || options.forceHTML5) || isiPad;

				controller = useHTML5 ? methods.htmlController : methods.swfController;

				controller.el = el;

				controller.init.apply(controller.init, args);

			});

		},



		swfController: {



			init: function (options) {



				if (initialized) {

					return;

				}



				initialized = true;



				o = $.extend({}, defaults, options);



				el.removeAttr('id');



				if (!o.video_id && src) {

					o.video_id = src.split('video/')[1].split('?')[0];

				}



				if (src.indexOf('autoplay') !== -1) {

					o.autoplay = src.split('autoplay=')[1].split('&');

				}



				div = $('<div class="' + o.className + '">');

				el.before(div);

				el.remove();



				div.append($('<div id="' + id + '">'));

				swfobject.embedSWF(

				o.swfpath + o.swfname, id, width, height, o.swfminversion, o.swfpath + o.swfupdater, flashvars(o), params(o), attribs(o), o.callback);

				

				if (o.select) {

					o.select.remove();

				}

			}

		},



		htmlController: {



			/**

			 * Our froogaloop instance for accessing the player API

			 */

			f: null,



			/**

			 * The URL of the currently loaded XML listing of available subtitles.

			 */

			currentListFile: null,





			/**

			 * The contents of the currently loaded XML list.

			 */

			currentListFileContents: null,



			/**

			 * Contains objects in the format {lang,title,file} for each available subtitle file in the XML list.

			 */

			listItems: null,



			/**

			 * The URL of the currently loaded subtitle file.

			 */

			currentSubtitleFile: null,



			/**

			 * The contents of the currently loaded subtitle file.

			 */

			currentSubtitleFileContents: null,



			/**

			 * An object representing the current subtitle line.

			 * The object has the format {start,end,text}.

			 * If there are no subtitles to be displayed at a certain time, the value of <code>cirrentLine</code will be <code>null</code>.

			 */

			currentLine: null,



			/**

			 * An array containing {start,end,text} objects for each subtitle line.

			 * Populated upon successfull loading via <code>loadSubtitleFile()</code>.

			 */

			srtLines: null,



			/*

			 * ============================================================================================

			 * 

			 * INIT

			 * 

			 * ============================================================================================

			 */



			/**

			 * Creates required elements and initiates loading of additional files.

			 * A wrapper element is created and inserted into the DOM as a sibling after the vimeo iframe.

			 * The wrapper element is positioned above the iframe and contains a .textfield element.

			 * After creating the elements, the froogaloop script is loadeed, and if a subitles_list value was specified in the options, that list file will be loaded too.

			 */

			init: function (options) {



				log('htmlController.init()');



				o = this.options = $.extend({}, defaults, options);

				div = $('<div class="' + o.className + '">');



				div.css({

					'position': 'relative',

					'width': width,

					'height': height

				});



				el.before(div);



				el.css({

					'position': 'absolute',

					'top': 0,

					'left': 0,

					'z-index': 0

				}).appendTo(div);



				div.append($('<div class="textfield"></div>'));



				controller.loadFroogaloop();



				if (o.subtitles_list) {

					controller.loadSubtitleList(o.subtitles_list);

				}



			},









			/*

			 * ============================================================================================

			 * 

			 * ASYNC FUNCTIONS

			 * 

			 * ============================================================================================

			 */



			/**

			 * Loads the required froogaloop script.

			 * The url for the script is defined in the defaults and may be overridden by an option value passed to init().

			 */

			loadFroogaloop: function () {

				if (window.Froogaloop) {

					controller.froogaloopLoaded.call(this);

				} else {

					var url = o.froogaloop_url;

					$.getScript(url, $.proxy(controller.handleFroogaloopLoaded, controller));

				}

			},



			/**

			 * Loads an XML file with a listing of available subtitle files.

			 * If the file is already loaded, nothing will happen.

			 * @param {String} url The url of the file to be loaded

			 */

			loadSubtitleList: function (url) {

				if (url === this.currentListFile) {

					log(url + ' already loaded');

					return;

				}

				this.currentListFileLoading = url;

				$.ajax({

					type: "GET",

					datatype: "xml",

					url: url

				}).done($.proxy(controller.handleSubtitleListLoaded, controller)).fail($.proxy(controller.handleSubtitleListFailed, controller));

			},



			/**

			 * Loads a subtitle file.

			 * Currently, only .srt subtitles are supported.

			 * If the file is already loaded, nothing will happen.

			 * @param {String} file The url of the file to be loaded

			 */

			loadSubtitlesFile: function (url) {

				if (url === this.currentSubtitleFile) {

					log(url + ' already loaded.');

					return;

				}

				if (o.select) {

					if (!o.select.find(':selected').length || o.select.find(':selected').val() !== url) {

						o.select.find('[value="' + url + '"]').attr('selected', 'selected');

					}

				}

				this.currentSubtitleFileLoading = url;

				$.ajax({

					type: 'GET',

					dataType: 'text',

					url: url

				}).done($.proxy(this.handleSubtitlesFileLoaded, this)).fail($.proxy(this.handleSubtitlesFileFailed, this));

			},





			/*

			 * ============================================================================================

			 * 

			 * DISPLAY FUNCTIONS

			 * 

			 * ============================================================================================

			 */



			update: function () {

				if (!this.srtLines) {

					return;

				}

				this.f.api('getCurrentTime', $.proxy(function (value) {

					var line = this.getLineByTime(value);

					if (line) {

						this.displayText(line.text);

						this.currentLine = line;

					} else if (this.currentLine) {

						this.displayText('');

						this.currentLine = null;

					}



				}, this));

			},



			/**

			 * Displays a string in the output textfield.

			 * @param {String} str The string to be fisplayed. May contain HTML tags.

			 */

			displayText: function (str) {

				div.find('.textfield').html(str);

			},







			/*

			 * ============================================================================================

			 * 

			 * EVENT HANDLERS

			 * 

			 * ============================================================================================

			 */





			/**

			 * Invoked when the froogaloop script has been loaded.

			 * Creates an instance of froogaloop and assigns it to <code>f</code>

			 */

			handleFroogaloopLoaded: function () {

				this.f = window.$f(el[0]);

				this.f.addEvent('ready', $.proxy(controller.handlePlayerReady, controller));

			},



			/**

			 * Invoked when the XML file listing of available subtitle files has been successfully completed.

			 * Populates the selectbox element with the files listed in the XML file. 

			 * @param {String} data The contents of the subtitle file. 

			 */

			handleSubtitleListLoaded: function (data) {

				this.currentListFile = this.currentListFileLoading;

				this.currentListFileContents = data;



				delete this.currentListFileLoading;

				var list = [{

					title: 'No subtitles'

				}],

					defaultSubtitlesFile = null;



				list.defaultLang = o.lang || $(data).find('subtitles').attr('default_id');



				$(data).find('subtitle').each(function () {

					list.push({

						lang: $(this).attr('id'),

						title: $(this).attr('title'),

						file: $(this).text()

					});

				});



				if (o.select && o.select.length) {

					$(list).each(function (i, obj) {

						o.select.append($('<option value="' + obj.file + '">' + obj.title + '</option>'));

						if (obj.lang === list.defaultLang) {

							defaultSubtitlesFile = obj.file;

						}

					});

					o.select.bind('change', $.proxy(controller.handleLanguageChange, controller));

				}



				el.trigger('listLoaded', [list, controller]);



				controller.listItems = list;



				if (defaultSubtitlesFile) {

					this.loadSubtitlesFile(defaultSubtitlesFile);

				}



			},



			handleSubtitleListFailed: function (e) {

				var msg = '[websubs] loadList() failed';

				log('[websubs] loadList() failed', e);

			},





			handleSubtitlesFileLoaded: function (response) {

				this.currentSubtitleFile = this.currentSubtitleFileLoading;

				this.currentSubtitleFileContents = response;

				delete this.currentSubtitleFileLoading;



				this.srtLines = this.parseSrt(response);

			},

			handleSubtitlesFileFailed: function (response) {

				var msg = 'failed loading ' + this.currentSubtitleFileLoading;

				log(msg, response);

				window.alert(msg);

			},



			handlePlayerReady: function () {

				this.f.addEvent('playProgress', $.proxy(this.handlePlayProgress, this));

			},



			handlePlayProgress: function (e) {

				this.update();

			},



			handleLanguageChange: function () {

				var file = o.select.find('option:selected').val();

				if (file) {

					this.loadSubtitlesFile(file);

				}

			},





			/*

			 * ============================================================================================

			 * 

			 * SRT FUNCTIONS

			 * 

			 * ============================================================================================

			 */



			/**

			 * Parses SRT data and returns an array of subtitle lines. 

			 * Each subtitle line is represented by an object: {id, start, end, text}

			 * TODO: amend the function as it is from the old version

			 * @param {String} The contents of a .srt file 

			 * @return {Array} An array containing an {start,end,text} object for each subtitle line

			 */

			parseSrt: function (string) {



				var result = [],

					lines = string.split('\n'),

					errors = [],

					s, sid, getLineIsEmpty, isEmpty, isFirst, isLast;





				getLineIsEmpty = function (line) {

					if (!line) {

						return true;

					}

					if (line) {

						if (line.length === 0) {

							return true;

						}

						if (line === '\\s') {

							return true;

						}

						if (line === '\\r') {

							return true;

						}

						if (line === '\\n') {

							return true;

						}

						if (line === '\\r\\n') {

							return true;

						}

						if (line.toString().trim().length === 0) {

							return true;

						}

					}

				};



				$(lines).each(function (i, l) {



					// detect if its an empty line

					isEmpty = getLineIsEmpty(l);



					// detect if its the first line

					isFirst = !isEmpty && !isNaN(l) && ((i === 0) || getLineIsEmpty(lines[i - 1]));



					// detect if its the last line			  

					isLast = isEmpty && (i >= lines.length - 1 || !isNaN(lines[i + 1]));



					//--------------------------------------------------------------

					// id line

					//--------------------------------------------------------------

					if (isFirst) {

						s = {

							id: parseInt(l, 10),

							text: ''

						};

						sid = i;

						//console.log('first line: '+l)

					}



					//--------------------------------------------------------------

					// timecode line

					//--------------------------------------------------------------



					if (i === sid + 1) {

						if (l.indexOf(' --> ') !== -1) {

							s.start = l.split(' --> ')[0];

							s.end = l.split(' --> ')[1];

						} else {

							errors.push("Illegal timecode line at " + i + ": " + l);

						}

						//console.log('tc line: '+l)

					}



					//--------------------------------------------------------------

					// text lines

					//--------------------------------------------------------------

					if (i >= sid + 2 && !isLast) {

						s.text += l.replace(/\r\n/g, '\n');

						if (!getLineIsEmpty(lines[i + 1])) {

							s.text += '\n';

						}

						//console.log('text line: '+l)

					}



					//--------------------------------------------------------------

					// last line

					//--------------------------------------------------------------

					if (isLast) {

						result.push(s);

						//console.log('last line: '+l)

					}



				});

				if (errors.length > 0) {

					window.alert('errors happened parsing the srt file!');

				}



				return result;

			},





			getLineByTime: function (time) {



				var lines = this.srtLines,

					i = 0,

					t = lines.length,

					line;



				while (i < t) {

					line = lines[i];

					if (line) {

						if (this.srtTimeToSeconds(line.start) <= time && this.srtTimeToSeconds(line.end) >= time) {

							i = t;

							return line;

						}

					}

					i = i + 1;

				}



				return null;

			},



			/**

			 * Takes an srt-formatted timecode and converts it to seconds

			 * @param a string in the format hh:mm:ss,ms

			 * @returns Decimal number of seconds

			 */

			srtTimeToSeconds: function (tc) {

				//00:05:54,880

				var qp = tc.split(':'),

					cp = qp[qp.length - 1].split(','),

					hh = Number(qp[0]),

					mm = Number(qp[1]),

					ss = Number(cp[0]),

					ms = Number(cp[1]),

					result = ss + mm * 60 + hh * 3600 + Number('0.' + ms);

				return result;



			}

		}

	};





	/*

	 * ============================================================================================

	 * 

	 * JQUERY PLUGIN DEFINITION

	 * 

	 * ============================================================================================

	 */

	$.fn.websubs = function (method) {

		var result;

		if (methods[method]) {

			result = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));

		} else if (typeof method === 'object' || !method) {

			result = methods.init.apply(this, arguments);

		} else if (swfmethods.indexOf(method) !== -1) {

			result = arguments.length > 1 ? this[0][method](Array.prototype.slice.call(arguments, 1)) : this[0][method]();

		} else {

			$.error('Method ' + method + ' does not exist on jQuery.websubs');

		}

		return result;

	};

	$.fn.websubs.c = 0;





	/*

	 * ============================================================================================

	 * 

	 * HELPERS / UTILITIES

	 * 

	 * ============================================================================================

	 */



	/**

	 * add DOMNodeRemoved event for MSIE

	 */

	(function () {

		var remove = $.fn.remove;

		$.fn.remove = function () {

			remove.apply(this, arguments);

			// -------------------------------------------- //

			// If this is IE, then manually trigger the DOM

			// node removed event on the given element.

			if ($.browser.msie) {

				$(this).trigger({

					type: "DOMNodeRemoved"

				});

			}

			// -------------------------------------------- //

		};

	}());



}