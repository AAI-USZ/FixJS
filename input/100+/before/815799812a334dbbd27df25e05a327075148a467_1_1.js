function(position){
		if( !this.cy.panningEnabled() ){
			return;
		}
		
		if( position === undefined ){
			return {
				x: this.translation.x,
				y: this.translation.y
			};
		}
		
		if( position == null || typeof position != typeof {} ){
			$.error("You can not pan without specifying a proper position object; `%o` is invalid", position);
			return;
		}
		
		this.transform({
			translation: {
				x: number(position.x),
				y: number(position.y)
			}
		});
	}