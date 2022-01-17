function removeTodoById( id ) {
	var i, l;

	for ( i = 0, l = todos.length; i < l; i++ ) {
		if ( todos[ i ].id === id ) {
			todos.splice( i, 1 );
		}
	}
}