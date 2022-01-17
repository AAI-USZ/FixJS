function(val){
					if(val != width){
						scalebuf.width = buffer.width = width = val;
						this.redraw();
					}
					return width;
				}