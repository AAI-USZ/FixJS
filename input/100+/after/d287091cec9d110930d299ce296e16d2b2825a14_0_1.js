function( attributes, options ) {
            // Ensure each object gets its own callbacks object
            this._callbacks = {};

			// Nasty hack, for cases like 'model.get( <HasMany key> ).add( item )'.
			// Defer 'processQueue', so that when 'Relation.createModels' is used we:
			// a) Survive 'Backbone.Collection.add'; this takes care we won't error on "can't add model to a set twice"
			//    (by creating a model from properties, having the model add itself to the collection via one of
			//    it's relations, then trying to add it to the collection).
			// b) Trigger 'HasMany' collection events only after the model is really fully set up.
			// Example that triggers both a and b: "p.get('jobs').add( { company: c, person: p } )".
			var dit = this;
			if ( options && options.collection ) {
				this._deferProcessing = true;
				
				var processQueue = function( model ) {
					if ( model === dit ) {
						dit._deferProcessing = false;
						dit.processQueue();
						options.collection.unbind( 'relational:add', processQueue );
					}
				};
				options.collection.bind( 'relational:add', processQueue );
				
				// So we do process the queue eventually, regardless of whether this model really gets added to 'options.collection'.
				_.defer( function() {
					processQueue( dit );
				});
			}
			
			this._queue = new Backbone.BlockingQueue();
			this._queue.block();
			Backbone.Relational.eventQueue.block();
			
			Backbone.Model.apply( this, arguments );
			
			// Try to run the global queue holding external events
			Backbone.Relational.eventQueue.unblock();
		}