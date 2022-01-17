function(x,y,s){
			element.style.top = y+"px";
			element.style.left = x+"px";
			this.selection = s;
			(Ayamel.FSElement()||document.body).appendChild(element);
		}