function (readFn, channelCount, bufferSize, sampleRate) {
	var	self		= this,
		context		= sinks.webaudio.getContext(),
		node		= null,
		soundData	= null,
		zeroBuffer	= null;
	self.start.apply(self, arguments);
	node = context.createJavaScriptNode(self.bufferSize, self.channelCount, self.channelCount);

	function bufferFill(e) {
		var	outputBuffer	= e.outputBuffer,
			channelCount	= outputBuffer.numberOfChannels,
			i, n, l		= outputBuffer.length,
			size		= outputBuffer.size,
			channels	= new Array(channelCount),
			tail;

		self.ready();
		
		soundData	= soundData && soundData.length === l * channelCount ? soundData : new Float32Array(l * channelCount);
		zeroBuffer	= zeroBuffer && zeroBuffer.length === soundData.length ? zeroBuffer : new Float32Array(l * channelCount);
		soundData.set(zeroBuffer);

		for (i=0; i<channelCount; i++) {
			channels[i] = outputBuffer.getChannelData(i);
		}

		self.process(soundData, self.channelCount);

		for (i=0; i<l; i++) {
			for (n=0; n < channelCount; n++) {
				channels[n][i] = soundData[i * self.channelCount + n];
			}
		}
	}

	self.sampleRate = context.sampleRate;

	node.onaudioprocess = bufferFill;
	node.connect(context.destination);

	self._context		= context;
	self._node		= node;
	self._callback		= bufferFill;
	/* Keep references in order to avoid garbage collection removing the listeners, working around http://code.google.com/p/chromium/issues/detail?id=82795 */
	// Thanks to @baffo32
	fixChrome82795.push(node);
}