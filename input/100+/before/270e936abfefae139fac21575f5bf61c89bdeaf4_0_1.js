function EntityManager() {

		if ( EntityManager.prototype.singletonInstance ) {

			return EntityManager.prototype.singletonInstance;

		}

		

		EntityManager.prototype.singletonInstance = this;

		this.entities = [];

		

		this.guard = function(entity) {

			if ( !(entity instanceof Entity) ) {

				throw "entity must be an instance of Entity";

			}	

		};

		

		this.add = function( entity ) {	

			this.guard(entity);

			

			this.entities.push(entity);

			return entity;

		};

		

		this.remove = function( entity ) {

			var index = this.entities.indexOf(entity);

			if( index !== -1) {

				this.entities.splice(index, 1);

			}

		};

		

		this.clear = function() {

			this.entities.length = 0;

		};

		

		this.indexOf = function( entity ) {

			this.guard(entity);

			

			return this.entities.indexOf( entity );

		};

		

		this.item = function(index) {

			if(index < 0 || index >= this.entities.length) {

				throw "argument out of range";

			}

			

			return this.entities[index];

		};

	

		this.each = function(action) {

			for(var i = 0; i < this.entities.length; i++) {

				action.apply(Game, this.entities[i]);

			}

		};

	}