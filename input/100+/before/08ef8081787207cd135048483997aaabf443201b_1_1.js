function() {
	if(app.argv._.length && actions.indexOf(app.argv._[0]) === -1) {
	    app.argv._.push(app.argv._[0]);
	    return cli.showServerInfo();
	}
	
	app.start();
    }