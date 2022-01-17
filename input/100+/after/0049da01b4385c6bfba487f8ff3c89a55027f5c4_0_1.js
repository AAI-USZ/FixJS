function(items){
			var items = items || 'default';
			if(this.presets[items]){
				this.exp = this.presets[items].exp;
				this.items = this.presets[items].items;
				return;
			}
			this.items = items;

			//sub pattern
			this.opener = [];
			this.closer = [];
			this.divider = [];
			this.wk = [];

			// regular expressions
			this.splitNestedPattern = new RegExp('^(.+)' + this.wildcards.id[0] + '(?:(.*)' + this.wildcards.tmp[0] + ')(.+)$');
			this.splitPattern = new RegExp('^(.+)' + this.wildcards.id[0] + '()(.+)$');

			this.analysePattern();
			this.build();
		}