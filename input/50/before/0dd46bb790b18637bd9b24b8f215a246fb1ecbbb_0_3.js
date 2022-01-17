function( router ) {
					var controller = router.get( 'applicationController' );
					var context = app.entriesController;
					context.set( 'filterBy', 'completed' );
					controller.connectOutlet( 'todos', context )
				}