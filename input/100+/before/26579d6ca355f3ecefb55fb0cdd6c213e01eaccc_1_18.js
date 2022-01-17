function(how){
		var fade = this.get('tween'), method, to, toggle;
		if (how == null) how = 'toggle';
		switch (how){
			case 'in': method = 'start'; to = 1; break;
			case 'out': method = 'start'; to = 0; break;
			case 'show': method = 'set'; to = 1; break;
			case 'hide': method = 'set'; to = 0; break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.getStyle('opacity') == 1);
				method = 'start';
				to = flag ? 0 : 1;
				this.store('fade:flag', !flag);
				toggle = true;
			break;
			default: method = 'start'; to = how;
		}
		if (!toggle) this.eliminate('fade:flag');
		fade[method]('opacity', to);
		if (method == 'set' || to != 0) this.setStyle('visibility', to == 0 ? 'hidden' : 'visible');
		else fade.chain(function(){
			this.element.setStyle('visibility', 'hidden');
			this.callChain();
		});
		return this;
	}