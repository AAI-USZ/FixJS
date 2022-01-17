function(e, transOpts){
			// Override from _ItemBase
			if(transOpts){
				setTimeout(lang.hitch(this, function(d){
					this.set("selected", false);
				}), 1500);
				return true;
			}else{
				if(this.getParent().transition === "below" && this.isOpen()){
					this.close();
				}else{
					this.open(e);
				}
				return false;
			}
		}