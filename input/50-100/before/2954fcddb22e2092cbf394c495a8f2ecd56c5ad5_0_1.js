function() {

		if(this.children.is_empty()) return;

		

		var effects = this.options.effects;

//		var deferred = $.Deferred();

		

		if(effects.initial) {

			effects = Ergo.override({}, effects, effects.initial);

			delete this.options.effects.initial;

		}

		

//		this.el[effects.show](effects.delay, function(){ deferred.resolve(); });

//		return deferred;

		return $.when( this.el[effects.show](effects.delay) );

	}