function (i, e) {
	
				// Tab context
				var tab = {};
					tab.uid = that.uid + "#" + i;
					tab.type = "tab";
					tab.element = e;
					tab.$element = $(e);
					tab.controller = that["public"];
	
				// Tab configuration
				var config = {};
					config.open = (selected === i);
					config.onShow = function () { selected = i; };
				
				if (ch.utils.hasOwn(that.conf, "cache")) { config.cache = that.conf.cache; }
	
				/**
				* Fired when the content of one dynamic tab loads.
				* @name ch.TabNavigator#onContentLoad
				* @event
				* @public
				*/
				if (ch.utils.hasOwn(that.conf, "onContentLoad")) { config.onContentLoad = that.conf.onContentLoad; }
				
				/**
				* Fired when the content of one dynamic tab did not load.
				* @name ch.TabNavigator#onContentError
				* @event
				* @public
				*/
				if (ch.utils.hasOwn(that.conf, "onContentError")) { config.onContentError = that.conf.onContentError; }
	
				// Create Tabs
				that.children.push(ch.tab.call(tab, config));
	
				// Bind new click to have control
				$(e).on("click", function (event) {
					that.prevent(event);
					select(i + 1);
				});
	
			}