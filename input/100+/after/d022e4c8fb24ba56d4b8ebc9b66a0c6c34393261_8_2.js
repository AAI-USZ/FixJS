function(buffer){
		"use strict";
		var samples = this.samples/this.channels,
			start = this.sampleStart,
			len = this.sampleLength,
			width, i, f, newm,
			fmax=Number.NEGATIVE_INFINITY,
			fmin=Number.POSITIVE_INFINITY,
			mchange=false;
			
		for(i=0;i<buffer.length;i+=32768){
			f = buffer.subarray(i,i+32768);
			fmax = Math.max(fmax,Math.max.apply(null,f));
			fmin = Math.min(fmin,Math.min.apply(null,f));
		}
		newm = Math.max(fmax,Math.abs(fmin));
		if(newm > this.max){
			mchange = true;
			this.max = newm;
		}
		this.frames.push(buffer);
		this.samples+=buffer.length;
		if(samples > start && samples < start+len){
			width = this.width;
			if(mchange){this.redraw();}
			else{
				this.redrawPart(Math.floor(width*(samples-start)/len),width);
				this.emit('redraw');
			}
		}
	}