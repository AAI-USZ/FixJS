function(card,mine){

		if (stage.get("#handCard"+card.cardID).length>0)

		{

			VisibleCardLayer.remove(stage.get("#handCard"+card.cardID)[0]);

		}

		var battlefieldCard = new Image();

		battlefieldCard.onload = function() {

			if (mine)

			{

				var image = new Kinetic.Image({x: card.position.x,y: card.position.y,image: battlefieldCard, width: card.position.scaleX, height: card.position.scaleY, draggable:true, dragBounds: {top: 375 ,left: 250, right: 1180, bottom: 570}, id: "battlefieldCard"+card.cardID.toString()});

				image.attrs.mine = mine;

				image.on("click",function(e){rightClickBattlefieldCard.apply(window,[e,image]);});

				image.on("dblclick",function(e){dblClickBattlefieldCard.apply(window,[e,image]);});

				image.on("dragend",function(e){dragEndBattlefieldCard.apply(window,[e,image]);});

				polishImageHandler(image,battlefieldCard);

				VisibleCardLayer.add(image);

			}

			else{

				var image = new Kinetic.Image({x: card.position.x, y: (700-card.position.y) - card.position.scaleY,image: battlefieldCard, width: card.position.scaleX, height: card.position.scaleY ,id: "battlefieldCard"+card.cardID.toString()});

				image.attrs.mine = mine;

				image.on("click",function(e){rightClickBattlefieldCard.apply(window,[e,image]);});

				image.on("dblclick",function(e){dblClickBattlefieldCard.apply(window,[e,image]);});

				polishImageHandler(image,battlefieldCard);

				VisibleCardLayer.add(image);

			}

			VisibleCardLayer.draw();

		};

		battlefieldCard.src = card.engSRC;

	}