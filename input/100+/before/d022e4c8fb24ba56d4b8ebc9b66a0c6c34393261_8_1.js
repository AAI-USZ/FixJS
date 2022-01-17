function WaveForm(width, height, channels, rate){
		"use strict";
		var start = 0, length = 0,
			buffer = document.createElement('canvas'),
			scalebuf = document.createElement('canvas'),
			ctx = buffer.getContext('2d'),
			scalectx = scalebuf.getContext('2d'),
			audiobuffer = [];
		
		scalebuf.width = buffer.width = width;
		scalebuf.height = buffer.height = height;
		
		this.buffer = buffer;
		this.ctx = ctx;	
		this.channels = channels;
		this.rate = rate;
		this.frames = [];
		this.max = 0;
		this.samples = 0;
		this.worker = null;
		
		this.sampleShift = function(x,l){
			if(x == start){
				if(l!=length){
					this.sampleLength = l;
				}
			}else if(l==length){
				this.sampleStart = x;
			}else{
				start = x>0?x:0;
				length = l>0?l:0;
				this.redraw();
			}
		};
		
		Object.defineProperties(this,{
			data: {
				get: function(){
					var i,offset,frame,newbuffer;
					if(this.frames.length){
						newbuffer = new Float32Array(this.samples);
						newbuffer.set(audiobuffer);
						for(i=0,offset=audiobuffer.length;frame=this.frames[i];i++){
							newbuffer.set(frame,offset);
							offset+=frame.length;
						}
						this.frames = [];
						audiobuffer = newbuffer;
					}
					return audiobuffer;
				}
			},
			width: {
				set: function(val){
					if(val != width){
						scalebuf.width = buffer.width = width = val;
					}
					return width;
				},
				get: function(){ return width; },
				enumerable: true
			},
			height: {
				set: function(val){
					if(val != height){
						scalebuf.height = buffer.height = height = val;
					}
					return width;
				},
				get: function(){ return height; },
				enumerable: true
			},
			sampleStart: {
				set: function(val){
					var diff;
					if(val < 0){val = 0;}
					else if(val > this.samples){val = this.samples;}
					if(val != start){
						if(this.sampleLength > 150000){
							diff = Math.round(width*(val-start)/length);
							start = val;
							
							if(Math.abs(diff) < width/1.5){ //there's significant overlap
								if(diff > 0){ //moving forward
									ctx.putImageData(ctx.getImageData(diff,0,width-diff,height),0,0);
									this.redrawPart(width-Math.max(diff,10),width);
								}else{ //moving backward
									diff = 0-diff;
									ctx.putImageData(ctx.getImageData(0,0,width-diff,height),diff,0);
									this.redrawPart(0,Math.max(diff,10));
								}
							}
							return start;
						}
						start = val;
						drawMono.call(this,0,width);
					}
					return start;
				},get: function(){return start;},
				enumerable: true
			},
			sampleLength: {
				set: function(val){
					var newcv, scale, idata;
					if(val < 0){val = 0;}
					if(val != length){
						scale = length/val;
						length = val;
						if(scale < 1){
							idata = ctx.getImageData(0,0,width,height);
							this.redrawPart(Math.floor(width*scale),width);
						}else{
							idata = ctx.getImageData(0,0,Math.ceil(width/scale),height);
						}
						scalectx.putImageData(idata,0,0);
						ctx.save();
						ctx.scale(scale,1);
						ctx.drawImage(scalebuf,0,0);
						ctx.restore();
					}
					return length;
				},get: function(){return length;},
				enumerable: true
			},
			start: {
				set: function(val){
					return this.sampleStart = Math.round(val*this.rate);
				},get: function(){return start/this.rate;},
				enumerable: true
			},
			length: {
				set: function(val){
					return this.sampleLength = Math.round(val*this.rate);
				},get: function(){return length/this.rate;},
				enumerable: true
			}
		});
	}