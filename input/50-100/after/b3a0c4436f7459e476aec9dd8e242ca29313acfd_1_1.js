function caption_menu(){
		var selection;
		return {
			element: document.createElement('span'),
			set selection(s){
				selection = s;
				this.element.innerText = s.toString();
			},
			get selection(){return selection;}
		};
	}