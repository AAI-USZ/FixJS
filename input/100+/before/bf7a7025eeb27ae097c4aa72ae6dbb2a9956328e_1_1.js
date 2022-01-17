function onConnect(status)
{
    if (status == Strophe.Status.CONNECTING) {
	log('Strophe is connecting.');
    } else if (status == Strophe.Status.CONNFAIL) {
	log('Strophe failed to connect.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.DISCONNECTING) {
	log('Strophe is disconnecting.');
    } else if (status == Strophe.Status.DISCONNECTED) {
	log('Strophe is disconnected.');
	$('#connect').get(0).value = 'connect';
    } else if (status == Strophe.Status.CONNECTED) {
	log('Strophe is connected.');
        if(window.location.pathname.substr(0,6) == "/room/"){
            talkback.roomname = window.location.pathname.replace("/room/", "");
            talkback.joinRoom(talkback.roomname+"@chat.talkback.im");            
        }else{
            talkback.roomname = "test";
            talkback.joinRoom("test@chat.talkback.im");
        }
        $("#mapname").text(talkback.roomname);
        talkback.pubsubSubscribe();

	//connection.disconnect();
    }
}