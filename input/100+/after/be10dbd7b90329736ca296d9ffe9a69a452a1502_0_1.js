function(html){
		if(html.strip() !==  ''){
			$('react_dialogbox').update(html.strip());
			$('react_dialogbox').setStyle({height: 'auto'});
			if(this.canDisplay){
				$('react_dialogbox').style.top = '100px';
				$('react_dialogbox').style.left = '50%';
				new Effect.Appear($('react_overlay'), {duration: 0.6, from: 0, to: 1.0});	
				new Effect.Appear($('react_modalbox'), {duration: 0.6, from: 0, to: 1.0});
				this.canDisplay = false;
			}
		}
	}