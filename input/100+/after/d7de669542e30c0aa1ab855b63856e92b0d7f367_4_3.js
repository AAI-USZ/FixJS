function (conf) {

	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.TabNavigator#that
	* @type object
	*/
	var that = this;

	conf = ch.clon(conf);

	that.conf = conf;

/**
*	Inheritance
*/

	that = ch.controllers.call(that);
	that.parent = ch.clon(that);

/**
*	Private Members
*/

	// Add CSS class to the main element 
	that.$element.addClass("ch-tabNavigator");

	/**
	* The actual location hash, is used to know if there's a specific tab selected.
	* @private
	* @name ch.TabNavigator#hash
	* @type string
	*/
	var hash = window.location.hash.replace("#!/", ""),

	/**
	* A boolean property to know if the some tag should be selected.
	* @private
	* @name ch.TabNavigator#hashed
	* @type boolean
	* @default false
	*/
		hashed = false,

	/**
	* Get wich tab is selected.
	* @private
	* @name ch.TabNavigator#selected
	* @type number
	*/
		selected = conf.selected || conf.value || undefined,

	/**
	* Create controller's children.
	* @private
	* @name ch.TabNavigator#createTabs
	* @function
	*/
		createTabs = function () {
	
			// Children
			that.$triggers.find("a").each(function (i, e) {
	
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
				* @name ch.TabNavigator#contentLoad
				* @event
				* @public
				*/
				if (ch.utils.hasOwn(that.conf, "onContentLoad")) { config.onContentLoad = that.conf.onContentLoad; }
				
				/**
				* Fired when the content of one dynamic tab did not load.
				* @name ch.TabNavigator#contentError
				* @event
				* @public
				*/
				if (ch.utils.hasOwn(that.conf, "onContentError")) { config.onContentError = that.conf.onContentError; }
	
				// Create Tabs
				that.children.push(ch.tab.call(tab, config));
	
				// Bind new click to have control
				$(e).on("click", function (event) {
					that.prevent(event);
					select(i);
				});
	
			});
	
			return;
	
		},

	/**
	* Select a child to show its content.
	* @name ch.TabNavigator#select
	* @private
	* @function
	*/
		select = function (index) {

				// Sets the tab's index
			var tab = that.children[index];

			// If select a tab that doesn't exist do nothing
			// Don't click me if I'm open
			if (!tab || index === selected) {
				return that;
			}

			// Hides the open tab
			if (typeof selected !== "undefined") {
				that.children[selected].innerHide();
			}

			// Shows the current tab
			tab.innerShow();

			// Updated selected index
			selected = index;
	
			//Change location hash
			window.location.hash = "#!/" + tab.$content.attr("id");
	
			/**
			* Fired when a tab is selected.
			* @name ch.TabNavigator#select
			* @event
			* @public
			*/
			that.trigger("select");
			
			// Callback
			that.callbacks("onSelect");

			return that;			
		};

/**
*	Protected Members
*/

	/**
	* The component's triggers container.
	* @protected
	* @name ch.TabNavigator#$triggers
	* @type jQuery
	*/
	that.$triggers = that.$element.children(":first").addClass("ch-tabNavigator-triggers").attr("role", "tablist");

	/**
	* The component's content.
	* @protected
	* @name ch.TabNavigator#$content
	* @type jQuery
	*/
	that.$content = that.$triggers.next().addClass("ch-tabNavigator-content ch-box").attr("role", "presentation");

/**
*	Public Members
*/

	/**
	* @borrows ch.Object#uid as ch.TabNavigator#uid
	*/	
	
	/**
	* @borrows ch.Object#element as ch.TabNavigator#element
	*/

	/**
	* @borrows ch.Object#type as ch.TabNavigator#type
	*/

	/**
	* Children instances associated to this controller.
	* @public
	* @name ch.TabNavigator#children
	* @type collection
	*/
	that["public"].children = that.children;

	/**
	* Select a specific tab or get the selected tab.
	* @public
	* @name ch.TabNavigator#select
	* @function
	* @param {Number} [tab] Tab's index.
	* @exampleDescription Selects a specific tab
	* @example
	* widget.select(2);
	* @exampleDescription Returns the selected tab's index
	* @example
	* var selected = widget.select();
	*/
	that["public"].select = function (tab) {
		// Returns selected tab instead set it
		// Getter
		if (!parseInt(tab)) {
			return selected;
		}

		// Setter
		select(tab -= 1);
		return that["public"];

	};

/**
*	Default event delegation
*/

	createTabs();

	// If hash open that tab
	for(var i = that.children.length; i--;) {
		if (that.children[i].$content.attr("id") === hash) {
			select(i);
			hashed = true;
			break;
		}
	};

	// Shows the first tab if not hash or it's hash and it isn't from the current tab
	if( !hash || ( hash && !hashed ) ){
		that.children[0].innerShow();
	}
	
	/**
	* Triggers when the component is ready to use (Since 0.8.0).
	* @name ch.TabNavigator#ready
	* @event
	* @public
	* @since 0.8.0
	* @example
	* // Following the first example, using <code>widget</code> as tabNavigator's instance controller:
	* widget.on("ready",function () {
	*	this.show();
	* });
	*/
	//This avoit to trigger execute after the component was instanciated
	setTimeout(function(){that.trigger("ready")}, 50);

	return that;

}