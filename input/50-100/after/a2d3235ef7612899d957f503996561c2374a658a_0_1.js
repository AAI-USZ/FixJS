function(event) {
		if(this.request.readyState == 4) {
			if(this.request.status == 200) {
				this.responseText = this.request.responseText;
				this.fireEvent('complete', this);
			}
			else {
				this.responseText = this.request.responseText;
				this.fireEvent('error', this, this.request.status);
			}
			this.request = undefined;
		}
	}