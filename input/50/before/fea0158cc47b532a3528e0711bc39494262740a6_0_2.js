function(event, element){
				var ref = decodeURIComponent( element.id );
				this.services.zap(ref, this.updateItems.bind(this));
				event.stop();
			}