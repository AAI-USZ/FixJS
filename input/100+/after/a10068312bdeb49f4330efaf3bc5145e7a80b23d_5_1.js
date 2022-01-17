function(){		
		var model = this;
    	var entity = Crafty.e("2D, DOM, Text, Keyboard");
		if (this.get('posX') === null) { this.set({'posX': (gameContainer.conf.get('stageWidth') / 2) - 250}); }
    	if (this.get('posY') === null) { this.set({'posY': gameContainer.conf.get('stageHeight') / 2 }); }
		entity.visible = 'false';
		entity
			.attr({x: model.get('posX'), y: model.get('posY'), w: 500,h:35, z: 10000})
            .text(model.get('text'))
            //.textColor('#FFF')
            //.textFont({'size' : '10px', 'family': 'Arial'})
			.css({	'font-size' : '20px', 
					'font-family': 'Arial',
					'text-align': 'center', 
					'valign': 'middle',
					'border': 'solid 10px #FFF', 
					'background-color' : 'red',
					'color' : '#FFF'	
				})
            .bind('Click', function(){
                                
            })
			.bind('KeyDown', function() {
				if(this.isDown('SPACE')) {
					this.destroy();
					if(Crafty.isPaused()) {Crafty.pause();}
					var action = model.get('actionToTrigger');
					if(action !== '') {
						Crafty.trigger(action);
					}
					
				}
			})
			.bind('EnterFrame', function() {
			if(!Crafty.isPaused()) { Crafty.pause() };
				//var infoText = model.get('name') + " --> &nbsp&nbsp&nbsp Lives: " + model.get('lives') + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  model.get('score');
				//this.text(infoText);
			})

    	model.set({'entity' : entity });
    }