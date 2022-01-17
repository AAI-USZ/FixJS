function () {
		if(this.db && this.openLogSaves===0) {
			this.db.close();
		} else { //wait for logsaves to finish
			var that = this;
			setTimeout(function(){
				that.closeDb();
			},100);
		}
	}