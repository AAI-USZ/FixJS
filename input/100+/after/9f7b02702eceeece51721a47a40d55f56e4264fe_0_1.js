function(){
			// create application controller instance
			this.controllers.push(new LoadController(this));
			this.controllers.push(new TransitionController(this));
			this.controllers.push(new LayoutController(this));

			// move set _startView operation from history module to application
			var hash = window.location.hash;
			this._startView = (((hash && hash.charAt(0) == "#") ? hash.substr(1) : hash) || this.defaultView).split('&')[0];
			this._startParams = this.getParamsFromHash(hash) || this.defaultParams || {};
		}