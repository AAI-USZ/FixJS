function (editorId) {
	this.editorId = editorId;
		// if the site is secure, create a secure iframe
	this.useHTTPS = false;
		// for Mozilla
	this.useCSS = false;
	this.enableMozillaExtension = true;
	this.disableEnterParagraphs = false;
	this.disableObjectResizing = false;
	this.removeTrailingBR = true;
		// style included in the iframe document
	this.editedContentStyle = HTMLArea.editedContentCSS;
		// content style
	this.pageStyle = "";
		// Maximum attempts at accessing the stylesheets
	this.styleSheetsMaximumAttempts = 20;
		// Remove tags (must be a regular expression)
	this.htmlRemoveTags = /none/i;
		// Remove tags and their contents (must be a regular expression)
	this.htmlRemoveTagsAndContents = /none/i;
		// Remove comments
	this.htmlRemoveComments = false;
		// Custom tags (must be a regular expression)
	this.customTags = /none/i;
		// BaseURL to be included in the iframe document
	this.baseURL = document.baseURI;
		// IE does not support document.baseURI
		// Since document.URL is incorrect when using realurl, get first base tag and extract href
	if (!this.baseURL) {
		var baseTags = document.getElementsByTagName ('base');
		if (baseTags.length > 0) {
			this.baseURL = baseTags[0].href;
		} else {
			this.baseURL = document.URL;
		}
	}
	if (this.baseURL && this.baseURL.match(/(.*\:\/\/.*\/)[^\/]*/)) {
		this.baseURL = RegExp.$1;
	}
		// URL-s
	this.popupURL = "popups/";
		// DocumentType
	this.documentType = '<!DOCTYPE html\r'
			+ '    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"\r'
			+ '    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r';
	this.blankDocument = '<html><head></head><body></body></html>';
		// Hold the configuration of buttons and hot keys registered by plugins
	this.buttonsConfig = {};
	this.hotKeyList = {};
		// Default configurations for toolbar items
	this.configDefaults = {
		all: {
			xtype: 'htmlareabutton',
			disabledClass: 'buttonDisabled',
			textMode: false,
			selection: false,
			dialog: false,
			hidden: false,
			hideMode: 'display'
		},
		htmlareabutton: {
			cls: 'button',
			overCls: 'buttonHover',
				// Erratic behaviour of click event in WebKit and IE browsers
			clickEvent: (Ext.isWebKit || Ext.isIE) ? 'mousedown' : 'click'
		},
		htmlareacombo: {
			cls: 'select',
			typeAhead: true,
			lastQuery: '',
			triggerAction: 'all',
			editable: !Ext.isIE,
			selectOnFocus: !Ext.isIE,
			validationEvent: false,
			validateOnBlur: false,
			submitValue: false,
			forceSelection: true,
			mode: 'local',
			storeRoot: 'options',
			storeFields: [ { name: 'text'}, { name: 'value'}],
			valueField: 'value',
			displayField: 'text',
			labelSeparator: '',
			hideLabel: true,
			tpl: '<tpl for="."><div ext:qtip="{value}" style="text-align:left;font-size:11px;" class="x-combo-list-item">{text}</div></tpl>'
		}
	};
}