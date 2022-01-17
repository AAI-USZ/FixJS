function(){
				superClassOnEndMethod.apply(this, args);

				// If parser ran (parseContent == true), wait for it to finish, otherwise call d.resolve() immediately
				when(this.parseDeferred, function(){ d.resolve(); });
			}