function caption_menu(){
		var selection;
		return Object.create(Object,{
				element: {value: document.createElement('span')},
				selection: {
					set: function(s){
						selection = s;
						this.element.innerText = s.toString();
					},
					get: function(){return selection;}
				}
			});
	}