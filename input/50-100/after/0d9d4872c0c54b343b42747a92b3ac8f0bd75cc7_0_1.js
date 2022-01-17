function(){
				var id = $(this).attr('id');
				
				if(!statements[id]){
					var overseer = new OverseerStatement(that, this);
					statements[id] = overseer;
					if(!that.activeStatement){
						that.activeStatement = overseer;
					}
				} else {
					statements[id].addTextBlock(this);
				}
			}