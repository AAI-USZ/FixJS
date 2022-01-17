function(successCallback,
			errorCallback) {

		var readChannels, tvTuners=[], channelList= [];

		try{
			readChannels = require(MOCK_CHANNELS_FILE);
		}catch(e){		
console.log(MOCK_CHANNELS_FILE+' '+readChannels);process.exit();
			if (typeof errorCallback === 'function') {
				errorCallback();
			}
			return;
		}


		if(readChannels && readChannels.sourceName && readChannels.channelList){
			for(var i=0; i<readChannels.channelList.length; i++){
				channelList.push(new Channel(
									0,
									readChannels.channelList[i].channelName,
									'Long name of '+readChannels.channelList[i].channelName,
									readChannels.channelList[i].channelURL,
									new TVSource(readChannels.sourceName)));
			}
			if(channelList.length){
				tvTuners.push({name:readChannels.sourceName,channelList:channelList});
			}
		}

		if (typeof successCallback === 'function') {
			successCallback(tvTuners);
			return;
		}

		if (typeof errorCallback === 'function') {
			errorCallback();
		}
	}