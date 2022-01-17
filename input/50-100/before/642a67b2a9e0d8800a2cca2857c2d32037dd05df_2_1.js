function (param_settings) {
	
	//random uuid generator from https://gist.github.com/1308368
	function uuidGenerator(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b;}
	this.uuid = uuidGenerator();
	if (param_settings) {
		this.logTarget = param_settings.logTarget;
	}

}