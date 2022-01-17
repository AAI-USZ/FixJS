function () {
		dojo.style(this.removeFileButton.domNode, { display: 'none' });
		dojo.style(this.thumbnailWrapper, { display: 'none' });
		dojo.style(this.infoFileButton.domNode, { display: 'none' });
		this.value = '';
		this.fileInfo = null;
		this.labelTextField.value = '';
		this.valueTextField.value = '';
	}