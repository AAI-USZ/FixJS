function(){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");
		
    	entity
            .attr({x: 0, y: 0, z: 1, w: gameContainer.conf.get('stageWidth'), h: 30})
            //.text(infoText)
            //.textColor('#FFF')
            //.textFont({'size' : '20px', 'family': 'Arial'})
			.css({fontSize : '15px', 'font-family': 'Arial','text-align': 'right','background-color' : 'blue','color' : '#FFF'})
            .bind('Click', function(){
                                
            })
			.bind('EnterFrame', function() {
				var infoText = model.get('name') + " --> &nbsp&nbsp&nbsp Lives: " + model.get('lives') + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  model.get('score');
				this.text(infoText);
			})

    	model.set({'entity' : entity });
    }