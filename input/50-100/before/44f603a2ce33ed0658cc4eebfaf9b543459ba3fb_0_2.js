function(args)
	{
		if(args.id)
		{
			args._id = new mongo.ObjectID(args.id);

			delete args.id;
		}
		return args;
	}