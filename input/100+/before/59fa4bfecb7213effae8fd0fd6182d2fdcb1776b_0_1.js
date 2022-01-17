function initBackEndJS()
{
	//Global vars
	myUsername = $('#account').attr('uname');
	myUID = $('#account').attr('uid');
	url = document.URL;
	isGameHost = (myUID==(url.substr(url.indexOf('game/')+3,url.length)));
	bothPlayersConnected = 0;
	init_status = false;

	clearStatusBox();
	ws = new WebSocket("ws://"+hostServerDomain+":"+gamePort+"/");
	ws.onopen = function(){
		log("Game server connected.\n\n");
		handShake();
		//ws.close();
	}
	ws.onclose = function(){
		log("Game server disconnected.\n\n");
		$("#status_oppo_img").attr("src",'/assets/lobby/broken.png');
		$("#status_me_img").attr("src",'/assets/lobby/broken.png');
	}
	ws.onmessage = processMessage;
}