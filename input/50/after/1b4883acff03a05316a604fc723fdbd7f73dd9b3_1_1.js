function(){
					if(cb){
						cb();
					}
					this.updateAttribute('votes', this.votes + 1);
				}), {id: this.id}