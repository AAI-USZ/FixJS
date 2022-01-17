function(){
    	var model = this;
    	var entity = Crafty.e("2D, DOM, Text");
		
    	entity
            .attr({x: 0, y: 0, z: 1, w: gameContainer.conf.get('stageWidth')})
            //.text(infoText)
            .textColor('#000')
            //.textFont({'size' : '20px', 'family': 'Arial'})
			.css({fontSize : '15px', 'font-family': 'Arial','text-align': 'right'})
            .bind('Click', function(){
                                
            })
			.bind('EnterFrame', function() {
				var infoText = model.get('name') + " --> &nbsp&nbsp&nbsp Lives: " + model.get('lives') + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +  model.get('score');
				this.text(infoText);
			})

    	model.set({'entity' : entity });
    }