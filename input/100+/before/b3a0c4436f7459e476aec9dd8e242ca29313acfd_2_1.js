function TextMenu(menu){
		var element, selection;
		if(menu instanceof HTMLElement){
			element = menu;
			Object.defineProperty(this,'selection',{
				get: function(){return selection;},
				set: function(s){return selection = s;}
			});
		}else if(menu && (menu.element instanceof HTMLElement)){
			element = menu.element;
			Object.defineProperty(this,'selection',{
				get: function(){return menu.selection;},
				set: function(s){return menu.selection = s;}
			});
		}else{ throw "Menu Not Displayable"; }
		if(element.parentNode){
			element.parentNode.removeChild(element);
		}
		element.style.position = "absolute";
		Object.defineProperties(this,{
			open: {
				value: function(x,y,s){
					element.style.top = y+"px";
					element.style.left = x+"px";
					this.selection = s;
					(Ayamel.FSElement()||document.body).appendChild(element);
				},enumerable: true
			},
			close: {
				value: function(){
					element.parentNode.removeChild(element);
				},enumerable: true			
			}
		});
	}