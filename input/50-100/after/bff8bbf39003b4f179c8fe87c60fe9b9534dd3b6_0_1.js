function(data){
		data = tools.toString(data);
		while(data.length > 0)	{
			var chunk = data.substring(0, this.options.bufferLimit);
			data = data.substring(chunk.length);
			this.buffer += chunk;
			if(this.buffer.length > this.options.bufferLimit)	{
				this.flush(this.options.bufferSize);
			}
		}
	}