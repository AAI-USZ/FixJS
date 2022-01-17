function() {
  
var createPopup, setStyles, positionPanel, initSocket;
var socket_url = 'http://impressjs.herokuapp.com/', uid, socketid, IJSRemote = {};

setStyles = function (el, o) {
	var key;
	for (key in o) {
    if (o.hasOwnProperty(key)) {
      el.style[key] = o[key];
    }
	}
};

positionPanel = function (el) {
  var viewportwidth,
    viewportheight,
    panelWidth = 300;
  if (typeof window.innerWidth !== 'undefined') {
    viewportwidth = window.innerWidth;
    viewportheight = window.innerHeight;
  } else if (typeof document.documentElement !== 'undefined'
      && typeof document.documentElement.clientWidth !== 'undefined'
      && document.documentElement.clientWidth !== 0) {
    viewportwidth = document.documentElement.clientWidth;
    viewportheight = document.documentElement.clientHeight;
  } else {
    viewportwidth = document.getElementsByTagName('body')[0].clientWidth;
    viewportheight = document.getElementsByTagName('body')[0].clientHeight;
  }
  setStyles(el, {
    position  : 'fixed',
    zIndex: 9999,
    backgroundColor: '#f5f5f5',
    width: panelWidth + 'px',
    height: '300px',
    padding: '30px 10px 20px 10px',
    textAlign: 'center',
    left: (viewportwidth / 2) - (panelWidth / 2) + 'px',
    top: '0px'
  });
};

createPopup = function(uid, socketid) {
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

};

initSocket = function() {
	var socket = io.connect(socket_url);

	socket.on('welcome', function (data) {
		uid = data.uid;
    socketid = data.socket_id;
    console.log('-> socket', socketid);
		createPopup(uid, socketid);
	});

  socket.on('command', function(data) {
    console.log('command received', data, socket.id);
  });
};

IJSRemote.close = function() {
  var p = document.getElementById('socket_popup');
  if (p) {
    p.style.display = 'none';
  }
};
initSocket();
window.IJSRemote = IJSRemote;
}