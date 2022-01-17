function(_id) {
				if(typeof _id === "undefined") {
					this.clearMods();
				}else if(typeof _id === "number") {
					this.mods.splice(_id, 1);
				}else{
					for(var i = 0; i < this.mods.length; i++) {
						var mod = this.mods[i];
						if(mod.name == _id) {
							this.mods.splice(i, 1);
						}
					}
				}
				return this;
			}