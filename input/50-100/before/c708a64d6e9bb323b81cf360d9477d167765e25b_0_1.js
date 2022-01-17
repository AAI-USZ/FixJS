function tweet(data) {
	count++;
	if ( typeof data === 'string' )
		sys.puts(data);
	else if ( data.text && data.user && data.user.screen_name )
		sys.puts('"' + data.text + '" -- ' + data.user.screen_name);
	else if ( data.message )
		sys.puts('ERROR: ' + sys.inspect(data));
	else
		sys.puts(sys.inspect(data));
}