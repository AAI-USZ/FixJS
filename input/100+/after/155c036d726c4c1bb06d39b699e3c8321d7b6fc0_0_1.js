function() { 
		if(self.menuVisible){
			console.log('resizing menu');
			var width = window.innerWidth - self.config.MENU_MARGIN;
			var diff = window.innerWidth - self.previousWidth;
			var menuObject = document.getElementById(self.menuVisible);		

			if(self.menuVisibleConfig.side=='right') self.x += diff;
			else self.x -= diff;
		
			//self.box.style.left = (-self.x)+'px';
			//menuObject.style.left = self.x+'px';

			var boxTranslate = "-webkit-transform:translate(" + (-self.x)+'px' + ", 0px)";
    		var menuTranslate = "-webkit-transform:translate(" + self.x+'px' + ", 0px)";
			self.box.setAttribute("style",boxTranslate);	
    		menuObject.setAttribute("style", menuTranslate);

			menuObject.style.width = width+'px';			
		}
		
		self.previousWidth = window.innerWidth;
	}