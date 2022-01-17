function() {
			var langObj = this.langObj = uiNLS;
			var dijitLangObj = commonNLS;
			dojo.mixin(this, langObj);
			dojo.mixin(this, dijitLangObj);
			this.cancel =true;
			this.inherited(arguments);
		}