function(successCallback,
			errorCallback) {

		// TODO: The following implementation needs to be modified to fit the
		// focused device, e.g. STB, DVB-Stick

		// Sample videos taken from:
		// http://people.opera.com/patrickl/experiments/webm/fancy-swap/
		var staticExampleTuners = [
				{
					name : "DVB-S",
					channelList : [
							new Channel(
									0,
									'CH01',
									'Long name of channel 1.',
									'http://people.opera.com/patrickl/experiments/webm/videos/fridge.webm',
									new TVSource('DVB-S')),
							new Channel(
									0,
									'CH02',
									'Long name of channel 2.',
									'http://people.opera.com/patrickl/experiments/webm/videos/garden1.webm',
									new TVSource('DVB-S')) ]
				},
				{
					name : "DVB-T",
					channelList : [
							new Channel(
									0,
									'CH100',
									'Long name of channel 1.',
									'http://people.opera.com/patrickl/experiments/webm/videos/garden2.webm',
									new TVSource('DVB-T')),
							new Channel(
									0,
									'CH101',
									'Long name of channel 101.',
									'http://people.opera.com/patrickl/experiments/webm/videos/windowsill.webm',
									new TVSource('DVB-T')) ]
				} ];

		if (typeof successCallback === 'function') {
			successCallback(staticExampleTuners);
			return;
		}

		if (typeof errorCallback === 'function') {
			errorCallback();
		}
	}