function(args)
	{
		if(args.id)
		{
			try { args._id = new mongo.ObjectID(args.id); }

			catch(e)
			{
				this.error(404, e.message);
			}
			delete args.id;
		}
		return args;
	}