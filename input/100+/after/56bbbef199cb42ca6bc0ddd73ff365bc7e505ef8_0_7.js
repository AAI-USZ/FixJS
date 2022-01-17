function CSS ($, CSSCONTEXT) {
	'use strict';
	$.log('Adding css rules.');

	var CSSObj  = CSSCONTEXT.CONSTANTS.CSS
	  , sizes   = CSSCONTEXT.CONSTANTS.IMAGESIZES
	  , classes = []
	  , theseRules
	  , cssStr
	  ;

	CSSObj['.dropBoxImage, .localImage '] = { cursor: $.browser.mozilla ? '-moz-zoom-in' : '-webkit-zoom-in' };
	CSSCONTEXT.UTILITY.extend(CSSObj['.beingDragged'], { cursor: $.browser.mozilla ? '-moz-grabbing;' : '-webkit-grabbing' });

	$.make('link').attr({ rel  : 'stylesheet'
						, type : 'text/css'
						, href : localStorage.getItem('jQueryUIcssDialog')
						})
				  .appendTo('head');

	$.log('Adding css for the CAA batch script.');
	$.make('style', { type : 'text/css' }).text(Object.keys(CSSObj).map(function create_css_rules (key) {
		var prefixed = [ 'appearance'
			           , 'box-shadow'
			           , 'border-radius'
			           , 'margin-after'
			           , 'opacity'
			           , 'transform'
			           ];

		theseRules = Object.keys(CSSObj[key]).map(function create_css_rules_internal (rule) {
			cssStr = CSSObj[key][rule];
			if ($.inArray(rule, prefixed) === -1) {
				return [rule, ':', cssStr].join('');
			} else {
				return [
					'-khtml-',  rule, ':', cssStr, ';',
					'-moz-',    rule, ':', cssStr, ';',
					'-webkit-', rule, ':', cssStr, ';',
					'-o-',      rule, ':', cssStr, ';',
					            rule, ':', cssStr
				].join('');
			}
		}).join(';');
		return [key, '{', theseRules, ';}'].join('');
	}).join('')).appendTo('head');

	$.log('Adding image preview css classes.');
	sizes.forEach(function create_css_style_elements (size) {
		classes.push($.make('style', { id   : 'style' + size
									 }).text('.localImage { width: ' + size + 'px; }')
									   .attr('type', 'text/css'));
	});

	$('head').appendAll(classes);

	$.log('Adding image preview methods.');
	var useSheets = function use_stylesheets (tiny, small, medium, big) {
		for (var i = 3; i >= 0; i--) {
			$('#style' + sizes[i]).prop('disabled', !arguments[i]);
		}
	};
	$.extend({
			 imagesTiny   : function imagesTiny () { useSheets(1, 0, 0, 0); },
			 imagesSmall  : function imagesSmall () { useSheets(0, 1, 0, 0); },
			 imagesMedium : function imagesMedium () { useSheets(0, 0, 1, 0); },
			 imagesLarge  : function imagesLarge () { useSheets(0, 0, 0, 1); }
			 });
}