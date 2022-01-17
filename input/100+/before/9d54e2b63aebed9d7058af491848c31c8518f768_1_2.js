function($) {

	"use strict";

	 

	var defaults = {

			swfpath: './media/swf/',

			swfname: 'VimeoSubtitlePlayer.swf',

			swfupdater: 'expressInstall.swf',

			swfminversion: "10.0.0", 

			className: 'vimeosubs',

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

		$self = null,

		

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

		 * a DIV element we create as a wrapper

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

		flashvars = function(obj) {

			var r = {}, prop, p;

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

		params = function(obj) {

			var r = {}, prop;

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

		attribs = function(obj) {

			var r = {}, prop;

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

		 * Calls console.log without throwing errors if console is unavailable.

		 */

		log = function() {

			try {

				console.log.apply(console, arguments);

			}

			catch (err) {}

		},

		 		

		methods = {

			//-----------------------------------------------------------

			// init

			//-----------------------------------------------------------

			init: function(options) {

				var args = arguments;

				return $(this).each(function() {

					src = $(this).attr('src');		 

					id = $(this).attr('id') || 'websubs_'+($.fn.websubs.c++);

					if (!src.match(/api=1/)) {

						src += (src.match(/\?/) ? '&' : '?') + 'api=1';

					}

					if (!src.match(/player_id=/)) {

						src += (src.match(/\?/) ? '&' : '?') + 'player_id='+id;

					}

					if (src != $(this).attr('src')) {

						$(this).attr('src', src);

					}



					width = $(this).width();

					height = $(this).height();

					el = $(this);

					el.attr('id', id);

					//$self = methods.html;

					//$self.el = el;

					//$self.init(options);

					//return;

					if (isiPad) {

						methods.html.init.apply(this, args);

					}

					else {

						methods.swf.init.apply(this, args);	

					}

				});

			},

			

			swf: {

				init: function(options) {

					o = $.extend({}, defaults, options);

					$(this).removeAttr('id');

					if (!o.video_id && src) { o.video_id = src.split('video/')[1].split('?')[0]; }

					if (src.indexOf('autoplay') !== -1) { o.autoplay = src.split('autoplay=')[1].split('&');}

					div = $('<div class="' + o.className + '">');

					$(this).before(div);

					$(this).remove(); 

					div.append($('<div id="'+id+'">'));

					swfobject.embedSWF(o.swfpath + o.swfname, id, width, height, o.swfminversion, o.swfpath + o.swfupdater,	flashvars(o), params(o), attribs(o), o.callback);

				}

			},

			

			html: {

				init: function(options) {

					o = this.options = $.extend({}, defaults, options);

					div = $('<div class="' + o.className + '">');

					

					div.css({

						'position': 	'relative',

						'width': 		width,

						'height': 		height

					});

					

					el.before(div);

					

					el.css({

						'position': 	'absolute',

						'top': 			0,

						'left': 		0,

						'z-index': 		0

					})

					.appendTo(div);

					//el.remove();

					

					var tf = $('<div class="textfield">Dies ist ein Test</div>')

					.css({

						'position': 	'absolute',

						'z-index': 		1,

						'bottom': 		60,

						'left': 		0,

						'font-family':	'Helvetica, Arial, Sans',

						'width': 		'100%',

						'text-align':	'center',

						'color':		'white',

						'font-size':	14

					})

					.appendTo(div);



					if (o.subtitles_list) {

						$self.loadList(o.subtitles_list);

					}

					

					$self.loadFroogaloop();

				},

				loadFroogaloop: function() {

					if (window['Froogaloop']) {

						$self.froogaloopLoaded.call(this);

					}

					else {

						var url = o.froogaloop_url;

						$.getScript(url, $.proxy($self.froogaloopLoaded, $self));

					}

				},

				froogaloopLoaded: function() {

					

					/*

		            froogaloop reference to our specific iframe.

		            in froogaloop2 we call api functions on this object, not on the iframe anymore

		            */

					var f = $f( el[0] );

			 		f.addEvent('ready', function() {

		                f.addEvent('playProgress', function(e) {

		                	console.log(e)

		                })

		            });

					  

		/*

		        	Froogaloop( $('#player_1')[0] ).addEvent('ready', function() {

		            	f = $f( $('#player_1')[0] );   

		                f.addEvent('finish', function() {

		                    alert('finished! do something...');

		                });

		            });

		

		

		            

		        	$('button.simple').each(function() {

		        		$(this).click(function() {

		        			f.api(this.id);

		        		});

		         	});

		         	*/

					

				},

				loadList: function(url) { 

					var jqXHR = $.ajax({

						type: "GET",

						datatype: "xml",

						url: url, 

						success: $.proxy($self.listLoaded, $self)

					});

					jqXHR.fail($.proxy($self.listFailed, $self));

				},

				

				listFailed: function(e) {

					log('[websubs] loadList() failed', e);

				},

				

				listLoaded: function(data) {

					var list = [{title: 'No subtitles'}]; 

					list.defaultLang = o.lang || $(data).find('subtitles').attr('default_id');

					

					$(data).find('subtitle').each(function(){ 

						list.push({

							lang: $(this).attr('id'),

							title: $(this).attr('title'),

							file: $(this).text()

						}); 

					});

					 

					

					if ($self.options.select && $self.options.select.length) {

						$(list).each(function(i, o){

							 $self.options.select.append($('<option value="'+o.file+'">'+o.title+'</option>'));

							 if (o.lang === list.defaultLang) {

								 

							 }

						});

					}

					

					el.trigger('listLoaded', [list, $self]);

					

					$self.list = list; 

					

				},

				

				loadSrt: function() {

				},

				

				srtLoaded: function() {

				},

				

				parseSrt: function() {

				},

				

				/**

				 * Takes an srt-formatted timecode and converts it to seconds

				 * @param a string in the format hh:mm:ss,ms

				 * @returns Decimal number of seconds

				 */

				srtTimeToSeconds: function(tc) {

					//00:05:54,880

					var qp = tc.split(':'),

						cp = qp[qp.length-1].split(','),

						hh = Number(qp[0]),

						mm = Number(qp[1]),

						ss = Number(cp[0]),

						ms = Number(cp[1]),

						result = ss	+ mm*60	+ hh*3600 + Number('0.'+ms);

					return result;

				

				}

			}

		};

		

	$.fn.websubs = function(method) {

		var result;

	   	if ( methods[method] ) { 

			result = methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));

	    } else if ( typeof method === 'object' || ! method ) {

			result = methods.init.apply( this, arguments );

	    } else if (swfmethods.indexOf(method) !== -1) {

			result = arguments.length > 1 ? this[0][method](Array.prototype.slice.call( arguments, 1 )) : this[0][method]();

	    } else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.websubs' );

	    }

	    return result;

	};

	$.fn.websubs.c = 0;

	

	/**

	 * add DOMNodeRemoved event for MSIE

	 */  

	(function(){ 

		var remove = $.fn.remove; 

		$.fn.remove = function(){ 

			remove.apply( this, arguments );

			// -------------------------------------------- //

			// If this is IE, then manually trigger the DOM

			// node removed event on the given element.

			if ($.browser.msie){

				$( this ).trigger({

					type: "DOMNodeRemoved"

				});

			}

			// -------------------------------------------- //

		};

	}());

}