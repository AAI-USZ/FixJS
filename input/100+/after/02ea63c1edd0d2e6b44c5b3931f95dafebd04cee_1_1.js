function (elm) {
			// Don't include this if statement if your plugin shouldn't run in mobile mode.
			if (pe.mobile) {
				return _pe.fn.pluginName.mobile(elm).trigger('create');
			}
			var opts,
				overrides,
				aVariable,
				anotherVariable;

			// Defaults
			opts = {
				// This is an example of defaults from tabbedinterface
				panelActiveClass : "active",
				tabActiveClass : "active",
				defaultTab : "li:first-child",
				autoHeight : true,
				cycle : false,
				carousel : false,
				autoPlay : false,
				animate : false,
				animationSpeed : "normal",
				updateHash : false
			};

			// Class-based overrides - use undefined where no override of defaults or settings.js should occur
			overrides = {
				// This is an example from tabbedinterface, to override defaults with configuration parameters passed from the html element to the plugin
				// There are some simple examples here, along with some more complicated ones.
				defaultTab : ((elm.find(".default").length) ? ".default" : undefined),
				autoHeight : elm.hasClass("auto-height-none") ? false : undefined,
				cycle : (elm.hasClass("cycle-slow") ? 8000 : (elm.hasClass("cycle-fast") ? 2000 : (elm.hasClass("cycle") ? 6000 : undefined))),
				carousel : elm.hasClass("style-carousel") ? true : undefined,
				autoPlay : elm.hasClass("auto-play") ? true : undefined,
				animate : (elm.hasClass("animate") || elm.hasClass("animate-slow") || elm.hasClass("animate-fast")) ? true : undefined,
				animationSpeed : (elm.hasClass("animate-slow") ? "slow" : (elm.hasClass("animate-fast") ? "fast" : undefined))
			};

			// Extend the defaults with settings passed through settings.js (wet_boew_pluginName), class-based overrides and the data-wet-boew attribute
			// Only needed if there are configurable options (has 'metadata' dependency)
			$.metadata.setType("attr", "data-wet-boew");
			if (typeof wet_boew_pluginName !== 'undefined' && wet_boew_pluginName !== null) {
				$.extend(opts, wet_boew_pluginName, overrides, elm.metadata());
			} else {
				$.extend(opts, overrides, elm.metadata());
			}

			// Do plugin stuff here...
			return elm;
		}