function () {
		var head = this.document.getElementsByTagName('head')[0];
		if (!head) {
			head = this.document.createElement('head');
			this.document.documentElement.appendChild(head);
		}
		if (this.config.baseURL) {
			var base = this.document.getElementsByTagName('base')[0];
			if (!base) {
				base = this.document.createElement('base');
				base.href = this.config.baseURL;
				head.appendChild(base);
			}
			this.getEditor().appendToLog('HTMLArea.Iframe', 'createHead', 'Iframe baseURL set to: ' + base.href, 'info');
		}
		var link0 = this.document.getElementsByTagName('link')[0];
		if (!link0) {
			link0 = this.document.createElement('link');
			link0.rel = 'stylesheet';
			link0.type = 'text/css';
				// Firefox 3.0.1 does not apply the base URL while Firefox 3.6.8 does so. Do not know in what version this was fixed.
				// Therefore, for versions before 3.6.8, we prepend the url with the base, if the url is not absolute
			link0.href = ((Ext.isGecko && navigator.productSub < 2010072200 && !/^http(s?):\/{2}/.test(this.config.editedContentStyle)) ? this.config.baseURL : '') + this.config.editedContentStyle;
			head.appendChild(link0);
			this.getEditor().appendToLog('HTMLArea.Iframe', 'createHead', 'Skin CSS set to: ' + link0.href, 'info');
		}
		if (this.config.defaultPageStyle) {
			var link = this.document.getElementsByTagName('link')[1];
			if (!link) {
				link = this.document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = ((Ext.isGecko && navigator.productSub < 2010072200 && !/^https?:\/{2}/.test(this.config.defaultPageStyle)) ? this.config.baseURL : '') + this.config.defaultPageStyle;
				head.appendChild(link);
			}
			this.getEditor().appendToLog('HTMLArea.Iframe', 'createHead', 'Override CSS set to: ' + link.href, 'info');
		}
		if (this.config.pageStyle) {
			var link = this.document.getElementsByTagName('link')[2];
			if (!link) {
				link = this.document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = ((Ext.isGecko && navigator.productSub < 2010072200 && !/^https?:\/{2}/.test(this.config.pageStyle)) ? this.config.baseURL : '') + this.config.pageStyle;
				head.appendChild(link);
			}
			this.getEditor().appendToLog('HTMLArea.Iframe', 'createHead', 'Content CSS set to: ' + link.href, 'info');
		}
	}