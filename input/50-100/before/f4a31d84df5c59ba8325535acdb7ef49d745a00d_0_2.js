function(args){
		var isNuclear = (args.command == 'nuclearbomb');
		if(args.user == challenged){
			if(args.message == color || (args.message == '42' && bot.getUserLevel(args.user, args.host) >= USER_LEVEL_MOD)){
				IRC.message(channel, 'Correct wire!');
				disarm();
			}else{
				IRC.message(channel, 'Wrong wire!');
				explode(isNuclear);
			}
		}
	}