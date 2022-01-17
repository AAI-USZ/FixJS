function (){
				var len = this.items.length;
				this.suspendLayout = true
				for (var i = len-1; i > 2; i--) {
					this.remove (this.getComponent (i));
				}
				this.suspendLayout = false
			}