function removeTodoById( id ) {
	var i = todos.length;

	while ( i-- ) {
		if ( todos[ i ].id === id ) {
			todos.splice( i, 1 );
		}
	}
}