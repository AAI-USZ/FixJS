function onDeviceReady() {
  	
  	// Get device info
    var deviceInfo = 	'Device Name: '     + device.name     + '<br />' + 
									    'Device Cordova: '  + device.cordova  + '<br />' + 
									    'Device Platform: ' + device.platform + '<br />' + 
									    'Device UUID: '     + device.uuid     + '<br />' + 
									    'Device Version: '  + device.version  + '<br />';
  	
  	$('#deviceProperties').html(deviceInfo)
  	
  	// Connect
  	var pusher = new Pusher(CONFIG.PUSHER.APP_KEY);
  	pusher.connection.bind('state_change', connectionStateChange);
  	
  	function connectionStateChange(state) {
  		$('#connectionStatus').html(state.current);
  	}
  	
  	// Subscribe
  	var channel = pusher.subscribe('my-channel');
  	channel.bind('pusher:subscription_succeeded', subscriptionSucceeded);
  	
  	function subscriptionSucceeded() {
  		$('#subscriptionStatus').html('succeeded');
  	}
  	
  	var clicks = 0;
  	$('#subscribeBtn').click( subscribeBtnClicked );
  	function subscribeBtnClicked() {
  		var channelName = 'channel-' + clicks;
  		++clicks;
  		pusher.subscribe(channelName);
  	}
  	
  }