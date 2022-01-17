f		var code = this.getCSS(),
		    raw = code.indexOf('{') > -1;
		
		var supportedStyle = PrefixFree.prefixCSS(code, raw && this.raw);
		
		if(raw && this.raw) {
			this.style.textContent = supportedStyle;
		}
		else {
			var valid = CSSEdit.updateStyle(this.subjects, code, 'data-originalstyle');
			
			if(this.textField && this.textField.classList) {
				this.textField.classList[valid? 'remove' : 'add']('error');
			}
		}
	},
