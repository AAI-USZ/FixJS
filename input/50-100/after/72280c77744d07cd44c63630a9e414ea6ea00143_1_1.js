function(data, time) {
		var time = Date.now() - time;
		console.log("Received by the 'phantom' main context: " + data + " time for socket " + time);
		nrOfMessages--;
		socketTimes.push(time);

		if(nrOfMessages == 0 && haveSentAllMessages){
			initialKillProcess();
		}
	}