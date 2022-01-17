function( eid, eInfo ) {
			
			Console.log("Firing '" + eid + "' event.", eid, eInfo);

			var reg = registry[ this.id ];
			if ( reg ) {

				var handlers = reg[ eid ];
				if ( handlers ) {

					for ( var i = 0; i < handlers.length; i++ ) {

						handlers[ i ]( eid, eInfo, this.id );
						Console.info(handlers[ i ], eInfo, this.id, eid, i);

					}

				}

			}

		}