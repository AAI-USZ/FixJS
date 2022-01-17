function(args, callback)
	{
		console.log('Connecting to Mongo database: ' + args.name);

		var that = this;

		this.conn = new mongo.Db(args.name, new mongo.Server
		(
			args.host, args.port, args.options || {}
		));
		this.conn.open(function(error, conn)
		{
			if(error)
			{
				that.error(error);
			}
			callback();
		});
	}