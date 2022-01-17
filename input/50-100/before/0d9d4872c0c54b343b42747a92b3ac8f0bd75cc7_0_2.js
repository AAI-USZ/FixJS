function(){
			if(this.futureBlock){
				this.block = this.futureBlock;
				delete this.futureBlock;
			}
			if (this.block >= this.textBlocks.length){
				this.block = this.textBlocks.length - 1;
			}
		}