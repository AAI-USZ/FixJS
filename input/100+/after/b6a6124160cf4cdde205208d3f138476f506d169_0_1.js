function onDom(event) {
		var olddomready = document.ondomready;
		if(document.ondomready !== null) {
			if(isLaunched == 0) {
				var evt = document.createEvent('Event');
				evt.initEvent('onDomReady', true, false);  
				document.dispatchEvent(evt);
				olddomready.call(this, evt);
				isLaunched = 1;
				if(console && debugBuild != false) {
					console.log('Event onDomReady has been called by DomContentLoaded.');
				}
			} else {
				if(console && debugBuild != false) {
					console.log('isLaunched=' + isLaunched);
					console.log('Dom ready=' + document.ondomready);
					console.log('Old dom ready=' + olddomready);
				}
			}
		}
	}