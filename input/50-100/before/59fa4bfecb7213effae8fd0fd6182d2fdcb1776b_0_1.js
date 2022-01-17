function testAndSendChatMsg(e)
{
	if (e.keyCode==13)
	{
		var msg = new Message("chat",myUsername,myUID,$('#chatInput').val());
		ws.send(JSON.stringify(msg));
	}
}