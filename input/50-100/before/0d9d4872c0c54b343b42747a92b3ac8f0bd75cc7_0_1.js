function(){
				var id = $(this).attr('id');
				
				//add overseers to overseerContainer sorted by id for easy lookup later
				if(!overseerContainer[id]){
					var overseer = new OverseerStatement(that, this);
					overseerContainer[id] = overseer;
					if(!that.activeStatement){
						that.activeStatement = overseer;
					}
				} else {
					overseerContainer[id].addTextBlock(this);
				}
			}