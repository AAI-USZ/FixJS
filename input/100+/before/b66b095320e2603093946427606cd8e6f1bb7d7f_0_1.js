function (fileInfo) {

		if(!fileInfo) {
			this._removeClicked();
			return;
		}
			
		this.fileInfo = fileInfo;
		if(this.showThumbnail && fileInfo.mimeType.indexOf('image') >= 0) {
			var thumbSize; 
			try {
				thumbSize = parseInt(dojo.cookie(this.id + '-thumbsize'));
			} catch (e) { }
			if(!thumbSize) {
				dojo.cookie(this.id + '-thumbsize', this.defaultThumbnailSize);
				this.thumbnailSize = this.defaultThumbnailSize;
			} else {
				this.thumbnailSize = thumbSize;
			}
	        this.thumbnailImage.src = "/resize_image?id=" + fileInfo.identifier + 
	        	"&w=" + this.thumbnailSize + "&rand=" + Math.random();
	        this.thumbnailSizeSlider.attr('value', this.thumbnailSize);
	        dojo.style(this.thumbnailWrapper, { display : "" });		
		} else {
	        dojo.style(this.thumbnailWrapper, { display : "none" });		
		}
		this.value = fileInfo.identifier;
		if(fileInfo.type == 'htmlpage')
			this.labelTextField.value = fileInfo.pageUrl;
		else
			this.labelTextField.value = fileInfo.fileName;
		this.valueTextField.value = fileInfo.identifier;

		if(this.showInfo) {
	        dojo.style(this.removeFileButton.domNode, { display : "" });		
		}
		
	    dojo.style(this.infoFileButton.domNode, { display : "" });		
	}