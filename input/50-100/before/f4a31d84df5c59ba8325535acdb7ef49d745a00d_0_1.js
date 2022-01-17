function(isNuclear){
	IRC.message(channel, 'BOOM!');
	if(isNuclear){
		IRC.ban(channel, challenged);
	}
	IRC.kick(channel, challenged, 'You failed to disarm the bomb! Correct wire was ' + color);
	challenged = '';
	channel = '';
	clearInterval(countdown);
}