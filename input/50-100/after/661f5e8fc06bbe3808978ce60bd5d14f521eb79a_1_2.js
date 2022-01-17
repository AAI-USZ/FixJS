function (message) {
			
				var complete = this.running;
				
				if(message) this.message = message;
				
				this[fireEvent]('cancel', this);
				if(complete) this[fireEvent]('complete', this);
				delete this.message;
				this.element.destroy()
			}