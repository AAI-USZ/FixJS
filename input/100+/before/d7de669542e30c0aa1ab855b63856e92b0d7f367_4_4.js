function (conf) {
	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Tab#that
	* @type object
	* @ignore
	*/
	var that = this;

	conf = ch.clon(conf);
	conf.icon = false;

	that.conf = conf;

/**
*	Inheritance
*/

	that = ch.uiobject.call(that);
	that.parent = ch.clon(that);

/**
*	Private Members
*/
	/**
	* Creates the basic structure for the tab's content.
	* @private
	* @name ch.Tab#createContent
	* @function
	* @ignore
	*/
	var createContent = function () {
		
		var href = that.element.href.split("#"),
			controller = that.$element.parents(".ch-tabNavigator"),
			content = controller.find("#" + href[1]);

		// If there are a tabContent...
		if (content.length > 0) {
			return content;

		// If tabContent doesn't exists
		} else {
			/**
			* Content configuration property.
			* @public
			* @name ch.Tab#source
			* @type string
			* @ignore
			*/
			that.source = that.element.href;

			var id = (href.length === 2) ? href[1] : "ch-tab" + that.uid.replace("#", "-");

			// Create tabContent
			return $("<div id=\"" + id + "\" role=\"tabpanel\" class=\"ch-hide\">").appendTo(controller.children().eq(1));
		}

	};

/**
*	Protected Members
*/
	/**
	* Reference to the trigger element.
	* @protected
	* @name ch.Tab#$trigger
	* @type jQuery
	* @ignore
	*/
	that.$trigger = that.$element;

	/**
	* The component's content.
	* @protected
	* @name ch.Tab#$content
	* @type jQuery
	* @ignore
	*/
	that.$content = createContent();

	/**
	* Shows component's content.
	* @protected
	* @function
	* @name ch.Tab#innerShow
	* @returns itself
	* @ignore
	*/
	that.innerShow = function (event) {
		that.prevent(event);

		that.active = true;

		// Load my content if I'need an ajax request 
		if (ch.utils.hasOwn(that, "source")) { that.content(); }

		// Show me
		that.$trigger.addClass("ch-" + that["type"] + "-trigger-on");

		// Set me as hidden false
		that.$content
				.attr("aria-hidden", "false")
				.removeClass("ch-hide");

		return that;
	};

	/**
	* Hides component's content.
	* @protected
	* @function
	* @name ch.Tab#innerHide
	* @returns itself
	* @ignore
	*/
	that.innerHide = function (event) {
		that.prevent(event);

		if (!that.active) { return; }
		
		that.active = false;

		// Hide me
		that.$trigger.removeClass("ch-" + that["type"] + "-trigger-on");

		// Set all inactive tabs as hidden
		that.$content
				.attr("aria-hidden", "true")
				.addClass("ch-hide");

		return that;
	};

	/**
	* This callback is triggered when async data is loaded into component's content, when ajax content comes back.
	* @protected
	* @name ch.Tab#contentCallback
	* @ignore
	*/
	that["public"].on("contentLoad", function (event, context) {

		that.$content.html(that.staticContent);

		if (ch.utils.hasOwn(conf, "onContentLoad")) {
			conf.onContentLoad.call(context, that.staticContent);
		}

	});

	/**
	* This callback is triggered when async request fails.
	* @public
	* @name contentCallback
	* @returns {Chico-UI Object}
	* @memberOf ch.TabNavigator
	* @ignore
	*/
	that["public"].on("contentError", function (event, data) {

		that.$content.html(that.staticContent);

		// Get the original that.source
		var originalSource = that.source;

		if (ch.utils.hasOwn(conf, "onContentError")) {
			conf.onContentError.call(data.context, data.jqXHR, data.textStatus, data.errorThrown);
		}

		// Reset content configuration
		that.source = originalSource;
		
		that.staticContent = undefined;

	});

/**
*	Public Members
*/

/**
*	Default event delegation
*/
	
	// Add the attributes for WAI-ARIA to the tabs and tabpanel
	that.$content.attr({
		"role": "tabpanel",
		"aria-hidden": that.$content.hasClass("ch-hide"),
		"class": "ch-hide"
	});

	that.$trigger.attr({
		"role": "tab",
		"arial-controls": that.$content.attr("id"),
		"class": "ch-tab-trigger"
	});
		
	return that;
}