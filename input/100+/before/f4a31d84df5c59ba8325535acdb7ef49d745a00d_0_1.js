function(args){
		var level = bot.getUserLevel(args.user, args.host);
		if(!bot.isCommand(args.command, level)){
			return;
		}
		switch(args.command){
			case 'bomb':
			case 'nuclearbomb':
				if(args.arguments && args.arguments[0]){
					if(challenged != ''){
						IRC.message(args.channel, args.user + ': bomb already in progress');
						return;
					}
					challenged = args.arguments[0];
					channel = args.channel;
					color = colors[Math.floor(Math.random()*(colors.length-1))];
					IRC.message(args.channel, challenged + ', you have been challenged!');
					IRC.message(args.channel, 'Answer (' + colors.join(', ') + ') before time runs out!');
					var timer = 10;
					var isNuclear = (args.command == 'nuclearbomb');
					countdown = setInterval(function(){
						IRC.message(args.channel, timer);
						timer--;
						if(timer < 0){
							explode(isNuclear);
						}
					}, 1000);
				}
			break;
		}
	}