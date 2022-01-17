function() {
		this.restoreSelection();
		var image = this.image;
		if (!image) {
			var range = this.editor.getSelection().createRange();
			this.editor.getSelection().execCommand('InsertImage', false, this.parameters.url);
			if (Ext.isWebKit) {
				this.editor.getDomNode().cleanAppleStyleSpans(this.editor.document.body);
			}
			if (Ext.isIE) {
				image = range.parentElement();
				if (!/^img$/i.test(image.nodeName)) {
					image = image.previousSibling;
				}
				this.editor.getSelection().selectNode(image);
			} else {
				var range = this.editor.getSelection().createRange();
				image = range.startContainer;
				image = image.lastChild;
				while (image && !/^img$/i.test(image.nodeName)) {
					image = image.previousSibling;
				}
			}
		} else {
			image.src = this.parameters.url;
		}
		if (/^img$/i.test(image.nodeName)) {
			Ext.iterate(this.parameters, function (fieldName, value) {
				switch (fieldName) {
					case 'alt':
						image.alt = value;
						break;
					case 'border':
						if (parseInt(value)) {
							image.style.borderWidth = parseInt(value) + 'px';
							image.style.borderStyle = 'solid';
						} else {
							image.style.borderWidth = '';
							image.style.borderStyle = 'none';
						}
						break;
					case 'align':
						image.style.verticalAlign = value;
						break;
					case 'paddingTop':
					case 'paddingRight':
					case 'paddingBottom':
					case 'paddingLeft':
						if (parseInt(value)) {
							image.style[fieldName] = parseInt(value) + 'px';
						} else {
							image.style[fieldName] = '';
						}
						break;
					case 'cssFloat':
						if (Ext.isIE) {
							image.style.styleFloat = value;
						} else {
							image.style.cssFloat = value;
						}
						break;
				}
			});
		}
	}