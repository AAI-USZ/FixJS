function (tab) {
			
			// If select a tab that don't exist do nothing
			if(!that.children[tab - 1]){ return; }

			tab = that.children[tab - 1];

			// Don't click me if I'm open
			if (tab === that.children[selected]) { return; }
	
			// Hide my open bro
			$.each(that.children, function (i, e) {
				if (tab !== e) { e.innerHide(); }
			});
			
			// shows the tab
			tab.innerShow();
	
			//Change location hash
			window.location.hash = "#!/" + tab.$content.attr("id");
	
			/**
			* Fired when a tab is selected.
			* @name ch.TabNavigator#onSelect
			* @event
			* @public
			*/
			that.callbacks("onSelect");

			// new callback
			that.trigger("select");
	
			return that;
			
		}