function(){
	IRC.message(channel, 'Bomb disarmed!');
	challenged = '';
	channel = '';
	clearInterval(countdown);
}