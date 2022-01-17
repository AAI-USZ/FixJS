function(block){
					//prepare block
					if(block.prepare) {
						allowed = block.prepare.apply(block, args);
						//break loop if false
						return allowed;
					}
				}