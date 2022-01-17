function( router ) {
					switchFilter('');
					var controller = router.get( 'applicationController' );
					var context = app.entriesController;
					context.set( 'filterBy', '' );
					controller.connectOutlet( 'todos', context )
				}