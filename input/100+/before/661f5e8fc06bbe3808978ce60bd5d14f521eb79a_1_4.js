function (file) {
			
				//clean file name
				Object.each(replaces, function (value, key) { file = file.replace(value, key) });
				
				this.state = 1;
				this.aborted = false; 
				this[fireEvent]('load', {element: this[element], file: file, size: 0, transfer: this});
				
				if(this.aborted) {
				
					this.state = 2;
					this[fireEvent]('abort', {file: file, message: this.message || '', transfer: this})
				}
				
				delete this.message;
				return this;
			}