function(editor, id) {
			// Could be a button or its hotkey
		var buttonId = this.translateHotKey(id);
		buttonId = buttonId ? buttonId : id;
		this.image = this.editor.getSelection().getParentElement();
		if (this.image && !/^img$/i.test(this.image.nodeName)) {
			this.image = null;
		}
		if (this.image) {
			this.parameters = {
				base: 		this.baseURL,
				url: 		this.image.getAttribute('src'),
				alt:		this.image.alt,
				border:		isNaN(parseInt(this.image.style.borderWidth)) ? '' : parseInt(this.image.style.borderWidth),
				align:		this.image.style.verticalAlign ? this.image.style.verticalAlign : '',
				paddingTop:	isNaN(parseInt(this.image.style.paddingTop)) ? '' : parseInt(this.image.style.paddingTop),
				paddingRight:	isNaN(parseInt(this.image.style.paddingRight)) ? '' : parseInt(this.image.style.paddingRight),
				paddingBottom:	isNaN(parseInt(this.image.style.paddingBottom)) ? '' : parseInt(this.image.style.paddingBottom),
				paddingLeft:	isNaN(parseInt(this.image.style.paddingLeft)) ? '' : parseInt(this.image.style.paddingLeft),
				cssFloat: 	HTMLArea.isIEBeforeIE9 ? this.image.style.styleFloat : this.image.style.cssFloat
			};
		} else {
			this.parameters = {
				base: 	this.baseURL,
				url: 	'',
				alt:	'',
				border:	'',
				align:	'',
				paddingTop:	'',
				paddingRight:	'',
				paddingBottom:	'',
				paddingLeft:	'',
				cssFloat: ''
			};
		}
			// Open dialogue window
		this.openDialogue(
			buttonId,
			this.getButton(buttonId).tooltip.title,
			this.getWindowDimensions(
				{
					width: 460,
					height:300
				},
				buttonId
			),
			this.buildTabItems()
		);
		return false;
	}