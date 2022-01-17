function(val){
					if(val != height){
						scalebuf.height = buffer.height = height = val;
						this.redraw();
					}
					return width;
				}