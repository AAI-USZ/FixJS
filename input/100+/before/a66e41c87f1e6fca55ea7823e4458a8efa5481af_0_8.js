function validTest( name ) {
	var filter = config.filter,
		run = false;

	if ( !filter ) {
		return true;
	}

	var not = filter.charAt( 0 ) === "!";
	if ( not ) {
		filter = filter.slice( 1 );
	}

	if ( name.indexOf( filter ) !== -1 ) {
		return !not;
	}

	if ( not ) {
		run = true;
	}

	return run;
}