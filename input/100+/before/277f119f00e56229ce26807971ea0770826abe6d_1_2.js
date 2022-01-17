function(uid, socketid) {
	var body = document.getElementsByTagName("body")[0],
		panel = document.createElement("div"),
    p = document.getElementById('socket_popup');

  if (!p) {
  	panel.id = 'socket_popup';
  	panel.innerHTML = '<img src="http://qrcode.kaywa.com/img.php?s=6&d=' + encodeURI(socket_url) + 'session/' + uid + '" alt="qrcode"  />';
  	panel.innerHTML += '<p>Scan this QR code or <br> Visit <a target="_blank" href="' + socket_url + 'session/' + uid +  '">' + socket_url + '</a> <br>and enter your session id';
  	panel.innerHTML += '<span class="socket_uid">' + uid + '</span><p>';
    panel.innerHTML += '<a class="socket_popup_close" href="javascript:IJSRemote.close();void(0);">close</a>'
  	positionPanel(panel);
  	body.appendChild(panel);
  }

}