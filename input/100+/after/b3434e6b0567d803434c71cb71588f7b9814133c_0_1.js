function($, window, document, undefined) {
	/**
	 * @var Regex identify the matrix filter in IE
	 */
	var rmatrix = /progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/,
		rfxnum = /^([\+\-]=)?([\d+.\-]+)(.*)$/,
		rperc = /%/;
	
	function stripUnits(arg) {
		return parseFloat(arg);
	}
	
	/**
	 * Find the prefix that this browser uses
	 */	
	function getVendorPrefix() {
		var property = {
			transform : '',
			MozTransform : '-moz-',
			WebkitTransform : '-webkit-',
			OTransform : '-o-',
			msTransform : '-ms-'
		};
		var style = document.documentElement.style;
		for (var p in property) {
			if (p in style) {
				return property[p];
			}
		}
		return null;
	}
	
	// Capture some basic properties
	var vendorPrefix			= getVendorPrefix(),
		transformProperty		= vendorPrefix !== null ? vendorPrefix + 'transform' : false,
		transformOriginProperty	= vendorPrefix !== null ? vendorPrefix + 'transform-origin' : false;
	
	// store support in the jQuery Support object
	$.support.csstransforms = (typeof(window.Modernizr) !== 'undefined'
		? Modernizr.csstransforms : vendorPrefix != null);
	
	// IE9 public preview 6 requires the DOM names
	if (vendorPrefix == '-ms-') {
		transformProperty = 'msTransform';
		transformOriginProperty = 'msTransformOrigin';
	}
	
	/**
	 * Class for creating cross-browser transformations
	 * @constructor
	 */
	$.extend({
		transform: function(elem) {
			// Cache the transform object on the element itself
			elem.transform = this;
			
			/**
			 * The element we're working with
			 * @var jQueryCollection
			 */
			this.$elem = $(elem);
						
			/**
			 * Remember the matrix we're applying to help the safeOuterLength func
			 */
			this.applyingMatrix = false;
			this.matrix = null;
			
			/**
			 * Remember the css height and width to save time
			 * This is only really used in IE
			 * @var Number
			 */
			this.height = null;
			this.width = null;
			this.outerHeight = null;
			this.outerWidth = null;
			
			/**
			 * We need to know the box-sizing in IE for building the outerHeight and outerWidth
			 * @var string
			 */
			this.boxSizingValue = null;
			this.boxSizingProperty = null;
			
			this.attr = null;
			this.transformProperty = transformProperty;
			this.transformOriginProperty = transformOriginProperty;
		}
	});
	
	$.extend($.transform, {
		/**
		 * @var Array list of all valid transform functions
		 */
		funcs: ['matrix', 'origin', 'reflect', 'reflectX', 'reflectXY', 'reflectY', 'rotate', 'scale', 'scaleX', 'scaleY', 'skew', 'skewX', 'skewY', 'translate', 'translateX', 'translateY']
	});
	
	/**
	 * Create Transform as a jQuery plugin
	 * @param Object funcs
	 * @param Object options
	 */
	$.fn.transform = function(funcs, options) {
		return this.each(function() {
			var t = this.transform || new $.transform(this);
			if (funcs) {
				t.exec(funcs, options);
			}
		});
	};
	
	$.transform.prototype = {
		/**
		 * Applies all of the transformations
		 * @param Object funcs
		 * @param Object options
		 * forceMatrix - uses the matrix in all browsers
		 * preserve - tries to preserve the values from previous runs
		 */
		exec: function(funcs, options) {
			// extend options
			options = $.extend(true, {
				forceMatrix: false,
				preserve: false
			}, options);
	
			// preserve the funcs from the previous run
			this.attr = null;
			if (options.preserve) {
				funcs = $.extend(true, this.getAttrs(true, true), funcs);
			} else {
				funcs = $.extend(true, {}, funcs); // copy the object to prevent weirdness
			}
			
			// Record the custom attributes on the element itself
			this.setAttrs(funcs);
			
			// apply the funcs
			if ($.support.csstransforms && !options.forceMatrix) {
				// CSS3 is supported
				return this.execFuncs(funcs);
			} else if ($.browser.msie || ($.support.csstransforms && options.forceMatrix)) {
				// Internet Explorer or Forced matrix
				return this.execMatrix(funcs);
			}
			return false;
		},
		
		/**
		 * Applies all of the transformations as functions
		 * @param Object funcs
		 */
		execFuncs: function(funcs) {
			var values = [];
			
			// construct a CSS string
			for (var func in funcs) {
				// handle origin separately
				if (func == 'origin') {
					this[func].apply(this, $.isArray(funcs[func]) ? funcs[func] : [funcs[func]]);
				} else if ($.inArray(func, $.transform.funcs) !== -1) {
					//Skew is removed ###############
					if (func == "skew" && console) console.warn("skew has been removed from W3C so it may not work!");
					//###############################
					values.push(this.createTransformFunc(func, funcs[func]));
				}
			}
			this.$elem.css(transformProperty, values.join(' '));
			return true;
		},
		
		/**
		 * Applies all of the transformations as a matrix
		 * @param Object funcs
		 */
		execMatrix: function(funcs) {
			var matrix,
				tempMatrix,
				args;
			
			var elem = this.$elem[0],
				_this = this;
			function normalPixels(val, i) {
				if (rperc.test(val)) {
					// this really only applies to translation
					return parseFloat(val) / 100 * _this['safeOuter' + (i ? 'Height' : 'Width')]();
				}
				return toPx(elem, val);
			}
			
			var rtranslate = /translate[X|Y]?/;
				
			for (var func in funcs) {
				switch ($.type(funcs[func])) {
					case 'array': args = funcs[func]; break;
					case 'string': args = $.map(funcs[func].split(','), $.trim); break;
					default: args = [funcs[func]];
				}
				
				if ($.matrix[func]) {
					
					if ($.cssAngle[func]) {
						// normalize on degrees
						args = $.map(args, $.angle.toDegree);
					} else if (!$.cssNumber[func]) {
						// normalize to pixels
						args = $.map(args, normalPixels);
					} else {
						// strip units
						args = $.map(args, stripUnits);
					}
					
					tempMatrix = $.matrix[func].apply(this, args);
					matrix = matrix ? matrix.x(tempMatrix) : tempMatrix;
				} else if (func == 'origin') {
					this[func].apply(this, args);
				}
			}
			
			// check that we have a matrix
			matrix = matrix || $.matrix.identity();

			// pull out the relevant values
			var a = parseFloat(matrix.e(1,1).toFixed(6)),
				b = parseFloat(matrix.e(2,1).toFixed(6)),
				c = parseFloat(matrix.e(1,2).toFixed(6)),
				d = parseFloat(matrix.e(2,2).toFixed(6)),
				tx = matrix.rows === 3 ? parseFloat(matrix.e(1,3).toFixed(6)) : 0,
				ty = matrix.rows === 3 ? parseFloat(matrix.e(2,3).toFixed(6)) : 0;
			
			//apply the transform to the element
			if ($.support.csstransforms && vendorPrefix === '-moz-') {
				// -moz-
				this.$elem.css(transformProperty, 'matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', ' + tx + 'px, ' + ty + 'px)');
			} else if ($.support.csstransforms) {
				// -webkit, -o-, w3c, firefox 16+
				// NOTE: WebKit and Opera don't allow units on the translate variables
				this.$elem.css(transformProperty, 'matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', ' + tx + ', ' + ty + ')');
			} else if ($.browser.msie) {
				// IE requires the special transform Filter
				
				//TODO: Use Nearest Neighbor during animation FilterType=\'nearest neighbor\'
				var filterType = ', FilterType=\'nearest neighbor\''; //bilinear
				var style = this.$elem[0].style;
				var matrixFilter = 'progid:DXImageTransform.Microsoft.Matrix(' +
						'M11=' + a + ', M12=' + c + ', M21=' + b + ', M22=' + d +
						', sizingMethod=\'auto expand\'' + filterType + ')';
				var filter = style.filter || $.curCSS( this.$elem[0], "filter" ) || "";
				style.filter = rmatrix.test(filter) ? filter.replace(rmatrix, matrixFilter) : filter ? filter + ' ' + matrixFilter : matrixFilter;
				
				// Let's know that we're applying post matrix fixes and the height/width will be static for a bit
				this.applyingMatrix = true;
				this.matrix = matrix;
				
				// IE can't set the origin or translate directly
				this.fixPosition(matrix, tx, ty);
				
				this.applyingMatrix = false;
				this.matrix = null;
			}
			return true;
		},
		
		/**
		 * Sets the transform-origin
		 * This really needs to be percentages
		 * @param Number x length
		 * @param Number y length
		 */
		origin: function(x, y) {
			// use CSS in supported browsers
			if ($.support.csstransforms) {
				if (typeof y === 'undefined') {
					this.$elem.css(transformOriginProperty, x);
				} else {
					this.$elem.css(transformOriginProperty, x + ' ' + y);
				}
				return true;
			}
			
			// correct for keyword lengths
			switch (x) {
				case 'left': x = '0'; break;
				case 'right': x = '100%'; break;
				case 'center': x = '50%'; break;
				default: x = (rfxnum.test(x) ? x : '50%');
			}
			switch (y) {
				case 'top': y = '0'; break;
				case 'bottom': y = '100%'; break;
				case 'center': y = '50%'; break;
				default: y = (rfxnum.test(y) ? y : '50%');
			}
			
			// store mixed values with units, assumed pixels
			this.setAttr('origin', [
				rperc.test(x) ? x : toPx(this.$elem[0], x) + 'px',
				rperc.test(y) ? y : toPx(this.$elem[0], y) + 'px'
			]);
			//console.log(this.getAttr('origin'));
			return true;
		},
		
		/**
		 * Create a function suitable for a CSS value
		 * @param string func
		 * @param Mixed value
		 */
		createTransformFunc: function(func, value) {
			if (func.substr(0, 7) === 'reflect') {
				// let's fake reflection, false value 
				// falsey sets an identity matrix
				var m = value ? $.matrix[func]() : $.matrix.identity();
				return 'matrix(' + m.e(1,1) + ', ' + m.e(2,1) + ', ' + m.e(1,2) + ', ' + m.e(2,2) + ', 0, 0)';
			}
			
			//value = _correctUnits(func, value);
			
			if (func == 'matrix') {
				if (vendorPrefix === '-moz-') {
					value[4] = value[4] ? value[4] + 'px' : 0;
					value[5] = value[5] ? value[5] + 'px' : 0;
				}
			}
			return func + '(' + ($.isArray(value) ? value.join(', ') : value) + ')';
		},
		
		/**
		 * @param Matrix matrix
		 * @param Number tx
		 * @param Number ty
		 * @param Number height
		 * @param Number width
		 */
		fixPosition: function(matrix, tx, ty, height, width) {
			// now we need to fix it!
			var	calc = new $.matrix.calc(matrix, this.safeOuterHeight(), this.safeOuterWidth()),
				origin = this.getAttr('origin'); // mixed percentages and px
			
			// translate a 0, 0 origin to the current origin
			var offset = calc.originOffset(new $.matrix.V2(
				rperc.test(origin[0]) ? parseFloat(origin[0])/100*calc.outerWidth : parseFloat(origin[0]),
				rperc.test(origin[1]) ? parseFloat(origin[1])/100*calc.outerHeight : parseFloat(origin[1])
			));
			
			// IE glues the top-most and left-most pixels of the transformed object to top/left of the original object
			//TODO: This seems wrong in the calculations
			var sides = calc.sides();

			// Protect against an item that is already positioned
			var cssPosition = this.$elem.css('position');
			if (cssPosition == 'static') {
				cssPosition = 'relative';
			}
			
			//TODO: if the element is already positioned, we should attempt to respect it (somehow)
			//NOTE: we could preserve our offset top and left in an attr on the elem
			var pos = {top: 0, left: 0};
			
			// Approximates transform-origin, tx, and ty
			var css = {
				'position': cssPosition,
				'top': (offset.top + ty + sides.top + pos.top) + 'px',
				'left': (offset.left + tx + sides.left + pos.left) + 'px',
				'zoom': 1
			};

			this.$elem.css(css);
		}
	};
	
	/**
	 * Ensure that values have the appropriate units on them
	 * @param string func
	 * @param Mixed value
	 */
	function toPx(elem, val) {
		var parts = rfxnum.exec($.trim(val));
		
		if (parts[3] && parts[3] !== 'px') {
			var prop = 'paddingBottom',
				orig = $.style( elem, prop );
				
			$.style( elem, prop, val );
			val = cur( elem, prop );
			$.style( elem, prop, orig );
			return val;
		}
		return parseFloat( val );
	}
	
	function cur(elem, prop) {
		if ( elem[prop] != null && (!elem.style || elem.style[prop] == null) ) {
			return elem[ prop ];
		}

		var r = parseFloat( $.css( elem, prop ) );
		return r && r > -10000 ? r : 0;
	}
}