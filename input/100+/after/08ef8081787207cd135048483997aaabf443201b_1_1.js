function() {
	//psm <server> shows status
	if(app.argv._.length && actions.indexOf(app.argv._[0]) === -1) {
	    app.argv._.push(app.argv._[0]);
	    return cli.showServerInfo();
	}

	//-h, --help shows help
	if(app.argv.help) {
	    help.forEach(function(line) {
		psm.log.info(line);
	    });
	    return;
	}

	//--version to show version
	if(app.argv.version) {
	    psm.log.info('Version: %s', psm.version, function() {
		process.exit(0);
	    });
	    return;
	}
	
	app.start();
    }