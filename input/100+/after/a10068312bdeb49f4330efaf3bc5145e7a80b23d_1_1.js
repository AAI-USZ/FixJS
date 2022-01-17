function(){
    	var model = this;
    	var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Fruit"); 
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize'), x: model.get('posX'), y: model.get('posY'), z: 500})
			.color(model.get('color'))
            .bind('EnterFrame', function(e){

            })
			.onHit("Snake", function () {
				this.destroy();
			})
			.bind("LevelRestart", function () {
				this.destroy();
			})
            .setName('Fruit');
			
    	model.set({'entity' : entity });
    }