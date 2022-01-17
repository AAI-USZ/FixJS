function(){
	ok( typeof Deferred == 'function', 'Deferred constrictor exists' );

	var d = new Deferred();

	ok( d, 'Deferred object is created' );
	ok( isFn(d.then), 'method .then exists' );
	ok( isFn(d.reject), 'method .reject exists' );
	ok( isFn(d.resolve), 'method .resolve exists' );
	ok( isFn(d.progress), 'method .progress exists' );
	ok( isFn(d.cancel), 'method .cancel exists' );
	ok( isFn(d.isRejected), 'method .isRejected exists' );
	ok( isFn(d.isResolved), 'method .isResolved exists' );
	ok( isFn(d.isFulfilled), 'method .isFulfilled exists' );
	ok( isFn(d.isCanceled), 'method .isCanceled exists' );

	function isFn( a ){
		return typeof a === 'function';
	}
}