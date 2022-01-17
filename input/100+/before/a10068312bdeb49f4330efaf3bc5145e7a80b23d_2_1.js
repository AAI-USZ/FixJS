function(){
    	var model = this;
    	var currDirection = {x:0, y:0};
		var entity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Collision, Color, Keyboard, Snake, Scorebox");
		//model.set({'body': []});
		
    	entity
            .attr({w: gameContainer.conf.get('gridSize'), h: gameContainer.conf.get('gridSize')})
			.color(model.get('color'))
			.bind('KeyDown', function () {
				if(this.isDown('A') || this.isDown('LEFT_ARROW')) {
					this.trigger('NewDirection', {x: -1, y: 0});
				}else
				if(this.isDown('S') || this.isDown('DOWN_ARROW')) {
					this.trigger('NewDirection', {x: 0, y: 1});
				}else
				if(this.isDown('D')  || this.isDown('RIGHT_ARROW')) {
					this.trigger('NewDirection', {x: 1, y: 0});
				}else
				if(this.isDown('W')  || this.isDown('UP_ARROW')) {
					this.trigger('NewDirection', {x: 0, y: -1});
				}
				
				if(this.isDown('R')) {
					model.grow();
				}
			})
			.bind('EnterFrame', function(e){
				if (Crafty.frame() % 5 !== 0) {return;} //SLOW DOWN
				
				var orgX = this.x;
				var orgY = this.y;
				
				if (currDirection.x < 0) {
					this.x = this.x - gameContainer.conf.get('gridSize');
				} 
				if (currDirection.x > 0) {
					this.x = this.x + gameContainer.conf.get('gridSize');
				} 
				if (currDirection.y < 0) {
					this.y = this.y - gameContainer.conf.get('gridSize');
				} 
				if (currDirection.y > 0) {
					this.y = this.y + gameContainer.conf.get('gridSize');
				}
				
				
				
				//trigger moved event
				if(this.x !== orgX || this.y !== orgY) {
					this.trigger('Moved', { x: orgX, y: orgY});
					
				}
				
            })
			.bind("NewDirection",
				function (direction) {
					currDirection = direction;
					//console.log(currDirection);
				})
            .bind('Moved', function(from) {
				if(hitByFruit = this.hit('Fruit')) {
					//console.log(hitByFruit);
					if(model.get('eatenThisLevel') < theWorld.get('maxEaten')) {
						theWorld.placeFruit();
						model.grow(model.get('nextGrowAmount'));
						model.set({'nextGrowAmount': model.get('nextGrowAmount') + 4});
						model.set({'eatenThisLevel': model.get('eatenThisLevel') + 1});
						model.set({'score': model.get('score') + model.get('eatenThisLevel')});
					} else {
						Crafty.trigger('NextLevel');
					}
				} 
				if(this.hit('Solid')){
					//console.log(hitArray); 
					this.attr({x: from.x, y:from.y});
					if (model.get('lives') > 1) {
						infobox = new Infobox({'text': model.get('name') + " Dies! Push Space! --->", 'actionToTrigger': 'LevelRestart'});
						model.set({'lives': model.get('lives') - 1});
						currDirection = {x:0, y:0};
					} else {
						alert("Your Dead");
						Crafty.scene("main");
					}
					//theWorld.died(this);
				} else { 
						//move body parts
						var oldX = 0;
						var oldY = 0;
						for (i = 0; i < model.get('bodySize'); i++) {
							if(i === 0) {
								var prevX = from.x;
								var prevY = from.y;
								//prevDirection = currDirection;
							} else {
								//prevDirection = model.get('body')[i - 1].get('currDirection');
							}							
							if(typeof model.get('body')[i] !== 'object') { //if this is a new body piece
									model.get('body')[i] = new Body({'posX': prevX, 'posY': prevY});
									oldX = prevX;
									oldY = prevY;
							} else {
								//move body part		
								oldX = model.get('body')[i].get('entity').x;
								oldY = model.get('body')[i].get('entity').y;
								model.get('body')[i].get('entity').x = prevX;
								model.get('body')[i].get('entity').y = prevY;
							}
							prevX = oldX;
							prevY = oldY;
						}	
							
				}
				
			})
			.bind("LevelRestart", function () {
				model.reset();
			})
            .setName('Snake');
			
    	model.set({'entity' : entity });
		
		//reset and create body
		this.reset();
		
    }