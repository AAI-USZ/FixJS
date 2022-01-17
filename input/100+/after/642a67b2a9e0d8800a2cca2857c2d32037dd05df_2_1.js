function () {
	//random uuid generator from https://gist.github.com/1308368
	if (cluster.isMaster) { //only the master process is allowed to change the uuid
		var uuid = function uuidGenerator(a,b){for(b=a='';a++<36;b+=a*51&52?(a^15?8^Math.random()*(a^20?16:4):4).toString(16):'-');return b;}
		return uuid();
	} 
}