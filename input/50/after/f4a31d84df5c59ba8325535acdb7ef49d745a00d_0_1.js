function(){
	IRC.message(channel, 'Bomb disarmed!');
	challenged = '';
	channel = '';
	isNuclear = 0;
	clearInterval(countdown);
}