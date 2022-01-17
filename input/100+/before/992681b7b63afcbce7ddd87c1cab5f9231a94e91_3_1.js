function (options) {
		if (options) {
			var i;
			// User defined options
			for (i in options) bb.options[i] = options[i];
		}
		
		// Assign our back handler if provided otherwise assign the default
		if (window.blackberry && blackberry.system && blackberry.system.event && blackberry.system.event.onHardwareKey) {
			
			if (bb.options.onbackkey) {
				blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK, bb.options.onbackkey);
			} else { // Use the default 
				blackberry.system.event.onHardwareKey(blackberry.system.event.KEY_BACK, bb.popScreen);
			}
		}
		
		// Initialize our flags once so that we don't have to run logic in-line for decision making
		bb.device.isRipple = (navigator.appVersion.indexOf('Ripple') >= 0);
		bb.device.isPlayBook = (navigator.appVersion.indexOf('PlayBook') >= 0) || ((window.innerWidth == 1024 && window.innerHeight == 600) || (window.innerWidth == 600 && window.innerHeight == 1024));
		if (bb.device.isPlayBook && bb.options.bb10ForPlayBook) {
			bb.device.isBB10 = true;
		} else {
			bb.device.isBB10 = (navigator.appVersion.indexOf('Version/10.0') >= 0);
		}
		bb.device.isBB7 = (navigator.appVersion.indexOf('7.0.0') >= 0) || (navigator.appVersion.indexOf('7.1.0') >= 0) || bb.device.isRipple;
		bb.device.isBB6 = navigator.appVersion.indexOf('6.0.0') >= 0;
		bb.device.isBB5 = navigator.appVersion.indexOf('5.0.0') >= 0;
		// Determine HiRes
		if (bb.device.isRipple) {
			bb.device.isHiRes = window.innerHeight > 480 || window.innerWidth > 480; 
		} else {
			bb.device.isHiRes = screen.width > 480 || screen.height > 480;
		}
		
		// Create our coloring
		if (document.styleSheets && document.styleSheets.length) {
			try {
				document.styleSheets[0].insertRule('.bb10Highlight {background-color:'+ bb.options.bb10HighlightColor +';background-image:none;}', 0);
				document.styleSheets[0].insertRule('.bb10-button-highlight {color:White;background-image: -webkit-gradient(linear, center top, center bottom, from('+bb.options.bb10AccentColor+'), to('+bb.options.bb10HighlightColor+'));border-color:#53514F;}', 0);
				document.styleSheets[0].insertRule('.bb10Accent {background-color:'+ bb.options.bb10AccentColor +';}', 0);
			}
			catch (ex) {
				console.log(ex.message);
			}
		}
		// Set our action bar coloring
		if (bb.options.bb10ActionBarDark) {
			bb.actionBar.color = 'dark';
		} else {
			bb.actionBar.color = 'light';
		}
		
		// Set our control coloring
		if (bb.options.bb10ControlsDark) {
			bb.screen.controlColor = 'dark';
		} else {
			bb.screen.controlColor = 'light';
		}
		
		// Set our list coloring
		if (bb.options.bb10ListsDark) {
			bb.screen.listColor = 'dark';
		} else {
			bb.screen.listColor = 'light';
		}
		
	}