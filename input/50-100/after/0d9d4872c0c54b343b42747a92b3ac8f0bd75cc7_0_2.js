function(){
			if(this.futureBlock){
				this.block = this.futureBlock;
				delete this.futureBlock;
			}
			if (this.block >= this.textBlocks.length){
				if (this.loop){
					this.block = 0;
				} else {
					this.block = this.textBlocks.length - 1;
				}
			}
		}