function(){
					if(cb){
						cb();
					}
					this.updateAttribute('owned', true);
				}), {id: this.id}