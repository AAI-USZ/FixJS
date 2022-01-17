function tweet(data) {
	count++;
	if ( typeof data === 'string' )
		util.puts(data);
	else if ( data.text && data.user && data.user.screen_name )
		util.puts('"' + data.text + '" -- ' + data.user.screen_name);
	else if ( data.message )
		util.puts('ERROR: ' + util.inspect(data));
	else
		util.puts(util.inspect(data));
}