function(){
		/*Y.on('keypress', Y.bind(function (e) {
			if (e.keyCode === 39) {
				e.halt();
				alert('right key pressed');
			}
		},this));*/
		

		Y.one('body').on("key",  function(e) {
			//alert('asd');
			console.log('Shift+RightArrow was pressed');
		},SHIFT_RIGHT_ARROW);



		/** on KeyDown **/
		if(Y.BodySubscr){
			this.killNavigation();
		}else{
			Y.BodySubscr = {};
		}
		Y.BodySubscr.keydown = Y.one('body').on('down',Y.bind(this.onMyKeyDown,this));
		/** ON KeyUp **/
		Y.BodySubscr.keyup = Y.one('body').on('up',Y.bind(this.onMyKeyUp,this));
    }