function() {
	runLoggingCallbacks( 'begin', QUnit, {} );

	// Initialize the config, saving the execution queue
	var oldconfig = extend({}, config);
	QUnit.init();
	extend(config, oldconfig);

	config.blocking = false;

	var urlConfigHtml = '', len = config.urlConfig.length;
	for ( var i = 0, val; i < len; i++ ) {
		val = config.urlConfig[i];
		config[val] = QUnit.urlParams[val];
		urlConfigHtml += '<label><input name="' + val + '" type="checkbox"' + ( config[val] ? ' checked="checked"' : '' ) + '>' + val + '</label>';
	}

	var userAgent = id("qunit-userAgent");
	if ( userAgent ) {
		userAgent.innerHTML = navigator.userAgent;
	}
	var banner = id("qunit-header");
	if ( banner ) {
		banner.innerHTML = '<a href="' + QUnit.url({ filter: undefined }) + '"> ' + banner.innerHTML + '</a> ' + urlConfigHtml;
		addEvent( banner, "change", function( event ) {
			var params = {};
			params[ event.target.name ] = event.target.checked ? true : undefined;
			window.location = QUnit.url( params );
		});
	}

	var toolbar = id("qunit-testrunner-toolbar");
	if ( toolbar ) {
		var filter = document.createElement("input");
		filter.type = "checkbox";
		filter.id = "qunit-filter-pass";
		addEvent( filter, "click", function() {
			var ol = document.getElementById("qunit-tests");
			if ( filter.checked ) {
				ol.className = ol.className + " hidepass";
			} else {
				var tmp = " " + ol.className.replace( /[\n\t\r]/g, " " ) + " ";
				ol.className = tmp.replace(/ hidepass /, " ");
			}
			if ( defined.sessionStorage ) {
				if (filter.checked) {
					sessionStorage.setItem("qunit-filter-passed-tests", "true");
				} else {
					sessionStorage.removeItem("qunit-filter-passed-tests");
				}
			}
		});
		if ( config.hidepassed || defined.sessionStorage && sessionStorage.getItem("qunit-filter-passed-tests") ) {
			filter.checked = true;
			var ol = document.getElementById("qunit-tests");
			ol.className = ol.className + " hidepass";
		}
		toolbar.appendChild( filter );

		var label = document.createElement("label");
		label.setAttribute("for", "qunit-filter-pass");
		label.innerHTML = "Hide passed tests";
		toolbar.appendChild( label );
	}

	var main = id('qunit-fixture');
	if ( main ) {
		config.fixture = main.innerHTML;
	}

	if (config.autostart) {
		QUnit.start();
	}
}