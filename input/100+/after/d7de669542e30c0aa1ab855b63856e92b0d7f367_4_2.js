function (index) {

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
		}