function(args)
	{
		console.log('AJAX.post({ url: ' + args.url + ',})');
		args.type = 'POST';
		ajax_request(args);
	}