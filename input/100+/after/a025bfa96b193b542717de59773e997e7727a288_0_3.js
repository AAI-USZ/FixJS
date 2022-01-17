function THIRDPARTY ($, THIRDCONTEXT) {
	/* Despite the name, each function in thirdParty is by Brian Schweitzer unless otherwise noted. */

	/*jshint strict:false */
	$.noConflict();

	if (!document.head) {
		document.head = document.getElementsByTagName('head')[0];
	}

	$.browser.chrome = navigator.userAgent.toString().toLowerCase().indexOf('chrome');

	$.extend({
		/* Takes a localStorage value name, and inserts the script stored there (as a string) into the DOM. */
		addScript: function $_addScript  (scriptSource) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.textContent = localStorage.getItem(scriptSource);
			document.head.appendChild(script);
		},
		// Creates and adds a new css rule
		addRule: function $_addRule (selector, rule, props) {
			var $rule = $('<style type="text/css">').text(selector + rule);
			void 0 !== props && $rule.prop(props);
			$rule.appendTo('head');
		},
		// Modified from http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
		dataURItoBlob: function $_dataURItoBlob (dataURI, mime) {
			// convert base64 to raw binary data held in a string
			var byteString;
			if (dataURI.split(',')[0].indexOf('base64') >= 0) {
				byteString = atob(dataURI.split(',')[1]);
			} else {
				byteString = atob(dataURI); // The followup at stackoverflow is wrong here; this version is fixed.
			}

			// write the bytes of the string to an ArrayBuffer
			var ab = new ArrayBuffer(byteString.length),
				ia = new Uint8Array(ab);
			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}

			// write the ArrayBuffer to a blob, and you're done
			var bb;
			try { // Old API
				window.BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder;
				bb = new BlobBuilder();
				bb.append(ab);
			} catch (e) { // New API
				bb = new Blob([ab]);
			}

			return bb.getBlob('image/' + mime);
		},
		// A very basic version of a gettext function.
		l: function $_l (str) {
			return (THIRDCONTEXT.CONSTANTS.TEXT[localStorage.getItem('Caabie_language') || 'en'][str]);
		},
		// Logs a message to the console if debug mode is on.
		log: function $_log (str, verbose) {
			if (!THIRDCONTEXT.CONSTANTS.DEBUGMODE) {
				return;
			}
			void 0 === verbose && (verbose = false);
			if (!verbose || THIRDCONTEXT.CONSTANTS.DEBUG_VERBOSE) {
				str.constructor !== Array ? console.log(str)
										  : console.log.apply(console, str);
			}
			return;
		},
		/* Polyfill input[type=number], if needed. */
		polyfillInputNumber : function $_polyfillInputNumber () {
			var testEle = document.createElement('input');
			testEle.setAttribute('type','number');
			if (testEle.type === 'number') {
				$.log('input[type=number] is supported, no polyfill needed.');
			} else {
				$.log('input[type=number] is not supported, loading polyfill.');
				// The above bit already tested for number support; no need to load Modernizr.
				var Modernizr = { inputtypes: { number: false }};
				/* This HAS to use eval, instead of using addScript.  If addScript is used, the DOM changes are made, but
				   because the code would exist in a different sandbox from this script, the change events would not be passed
				   to this script's handlers.  Eval keeps it in this same javascript context. */
				eval(localStorage.getItem('inputNumberPolyfill'));
			}
		}
	});

	$.addScript('jQueryAnimateEnhanced');
	$.addScript('jQueryGetHiddenDimensions');

	// By Brian Schweitzer and Naftali Lubin
	// Appends an array of jQuery objects to a jQuery object
	$.fn.appendAll = function $_prototype_appendAll (arrayToAdd) {
		var $fragment = $.single(document.createDocumentFragment())
		  , i = 0
		  , len = arrayToAdd.length
		  , $fragAppend = $fragment.append
		  ;

		do {
		  $fragAppend.apply(this, arrayToAdd[i] );
		} while (i++ < len);
		return this.append($fragment);
	};

	// Modify jQuery.append to allow appending document fragments.
	$.fn.append = function $_prototype_append () {
		return this.domManip(arguments, true, function (a) {
			this.nodeType % 10 === 1 && this.appendChild(a);
		});
	};

	// Sets the css visibility using a boolean value rather than a string value
	$.fn.vis = function $_prototype_vis (i) {
		return this.css('visibility', i ? 'visible'
										: 'hidden');
	};

	// A faster .clone(); clones only the nodes, without regard to events.  deep = true == deep node copy.
	$.fn.quickClone = function $_prototype_quickClone (deep) {
		return this.map(function quickClone_internal (elem, deep) {
			return this.cloneNode(deep || false);
		});
	};

	// Tests whether an element has a defined property value.
	$.fn.hasProp = function $_prototype_hasProp (property) {
		property = this.prop(property);
		return (void 0 !== property && property.length);
	};

	/* Get the width of an element.  Faster than .width(). */
	$.fn.quickWidth = function $_prototype_quickWidth (which) {
		return parseInt($.css(this[which || 0], 'width'), 10);
	};

	/* Get the height of an element.  Faster than .height(). */
	$.fn.quickHeight = function $_prototype_quickHeight (which) {
		return parseInt($.css(this[which || 0], 'height'), 10);
	};

	/* jQuery.single, by James Padolsey
	   http://james.padolsey.com/javascript/76-bytes-for-faster-jquery/
	*/
	$.single = (function $_single (o){
		 var collection = $([1]); // Fill with 1 item, to make sure length === 1
		 return function single_internal (element) {
			 // Give collection the element:
			collection[0] = element;
			 // Return the collection:
			return collection;
		 };
	}());

	/*!
	 * jQuery Detach+ - v0.1pre - 5/18/2011
	 *  https://gist.github.com/978520
	 * http://benalman.com/
	 *
	 * Copyright (c) 2011 "Cowboy" Ben Alman
	 * Dual licensed under the MIT and GPL licenses.
	 * http://benalman.com/about/license/
	 */
	 // https://gist.github.com/938767
	  var detach = $.detach = function $_detach (node, async, fn) {
			  var parent = node.parentNode;
			  var next = node.nextSibling;
			  if (!parent) {
				  return;
			  }
			  parent.removeChild(node);
			  if (Boolean !== async.constructor) {
				  fn = async;
				  async = false;
			  }
			  if (fn && async) {
				  fn.call(node, reattach);
			  } else if (fn) {
				  fn.call(node);
				  reattach();
			  }

			  function reattach() {
				  parent.insertBefore(node, next);
			  }
		  };

	  $.fn.detach = function $_prototype_detach (async, fn) {
		  return this.each(function detach_internal () {
			  detach(this, async, fn);
		  });
	  };

	$.make = function $_make (tagName, options) {
			/* Faster element creation. */
			var domEl = [document.createElement(tagName)]
			  , jq = $
			  ;

			jq.fn.prop.call(domEl, options, true);
			return jq.merge(jq(), domEl);
	};
	
	// http://weblog.bocoup.com/using-datatransfer-with-jquery-events/
	$.event.props.push('dataTransfer');
}