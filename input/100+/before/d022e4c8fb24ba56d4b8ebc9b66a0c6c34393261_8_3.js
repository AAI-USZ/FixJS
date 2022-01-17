function(cb){
		var channels = this.channels,
			start = this.sampleStart*channels,
			end = start+this.sampleLength*channels;
		if(this.worker){this.worker.terminate();}
		this.worker = new Worker("waveWorker.js");
		this.worker.addEventListener('message',drawPath.bind(this,cb));
		this.worker.postMessage({
			frame:new Float32Array(this.data.subarray(start, end)),
			channels:channels,
			rate:this.rate,
			width:this.width,
			height:this.height,
			max:this.max		
		});
		//drawChannels.call(this,0,this.width);
	}