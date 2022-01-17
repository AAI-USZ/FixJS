function(){
		//pause the game
		if(!Crafty.isPaused()) { Crafty.pause(); };
		var model = this;
    	var entity = Crafty.e("2D, DOM, Text, Keyboard");
		if (this.get('posX') === null) { this.set({'posX': (gameContainer.conf.get('stageWidth') / 2) - 250}); }
    	if (this.get('posY') === null) { this.set({'posY': gameContainer.conf.get('stageHeight') / 2 }); }
		entity.visible = 'false';
		entity
			.attr({x: model.get('posX'), y: model.get('posY'), w: 500,h:35, z: 10000})
            .text(model.get('text'))
            .textColor('#000')
            //.textFont({'size' : '10px', 'family': 'Arial'})
			.css({	'font-size' : '20px', 
					'font-family': 'Arial',
					'text-align': 'center', 
					'valign': 'middle',
					'border': 'solid 10px #00F', 
					'background-color' : '#0F0' 
				})
            .bind('Click', function(){
                                
            })
			.bind('KeyDown', function() {
				if(this.isDown('SPACE')) {
					if(Crafty.isPaused()) {Crafty.pause();}
					this.destroy();
					Crafty.trigger(model.get('actionToTrigger'));
					
				}
			})
			.bind('EnterFrame', function() {
				//var infoText = model.get('name') + " --> &nbsp&nbsp&nbsp Lives: " + model.get('lives') + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  model.get('score');
				//this.text(infoText);
			})

    	model.set({'entity' : entity });
    }