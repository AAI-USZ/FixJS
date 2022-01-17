function( router ) {
					switchFilter('active');
					var controller = router.get( 'applicationController' );
					var context = app.entriesController;
					context.set( 'filterBy', 'active' );
					controller.connectOutlet( 'todos', context )
				}