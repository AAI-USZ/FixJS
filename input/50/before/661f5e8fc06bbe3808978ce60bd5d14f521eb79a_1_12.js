function () {

				if(this.reader) {
				
					if(this.ready) this.initUpload();
					else setTimeout(this[upload].bind(this), 100)
				} else this.initUpload()
			}