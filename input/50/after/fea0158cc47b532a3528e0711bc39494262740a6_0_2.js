function(event, element){
				var ref = decodeURIComponent( element.id );
				this.services.zap(ref, this.delayedUpdateItems.bind(this));
				event.stop();
			}