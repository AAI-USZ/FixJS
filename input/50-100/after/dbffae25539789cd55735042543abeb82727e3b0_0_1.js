function(){
	var def1 = new Deferred(),
		def2 = new Deferred(),
		defList = new DeferredList( [def1, def2], false, true );

	stop();
	expect( 1 );

	defList.then(
		function(){
			ok( false, 'Test must go to reject callback' );
			start();
		},
		function(){
			ok( defList.isRejected(), 'Test goes to reject callback' );
			start();
		}
	);

	def1.reject();
}