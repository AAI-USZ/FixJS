function(loc)
		{
			var wlh = window.location.hash,
				triggerEvent = false,
				arguments = Array.from(arguments);
			
			// Polymorphism at work!
			if(typeof(arguments[arguments.length-1]) == 'boolean')
			{
				triggerEvent = arguments[--arguments.length];
				delete arguments[arguments.length];
			}
			
			// Page+params (mode 2)
			if(typeof(arguments[0]) == 'string' && arguments[1] && typeof(arguments[2]) == 'undefined')
			{ wlh = this.options.parser.createURIMode2(Array.from(arguments)); }
			
			// Prefix+page+params (mode 3)
			else if(typeof(arguments[0]) == 'string' && typeof(arguments[1]) == 'string' && typeof(arguments[2]) != 'undefined')
			{ wlh = this.options.parser.createURIMode3(Array.from(arguments)); }
			
			// History (mode 1)
			else if(typeof(loc) == 'number' && this.$_hidden_history_loaded && navigateTo)
			{ wlh = this.options.parser.createURIMode1History(loc); }
			
			// Params (mode 1)
			else if(typeof(loc) == 'object')
			{ wlh = this.options.parser.createURIMode1Object(loc); }
			
			// URI (mode 1)
			else if(typeof(loc) == 'string')
			{ wlh = this.options.parser.createURIMode1String(loc); }
			
			// Unknown
			else return false;
			if(wlh === false) return navigateTo ? false : null;
			
			if(navigateTo)
			{
				window.location.hash = wlh;
				if(triggerEvent) this.triggerEvent();
				else this.poll();
				return true;
			}
			
			else return '#'+wlh;
		}