function $_polyfillInputNumber () {
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