function(size,color){

				var g = new Graphics();

				if(color === undefined) color = Graphics.getRGB(255,255,255,1);

				g.beginFill(color);

				

				g.drawCircle(0,0, size);

				

				var shape = new Shape(g);

				stage.addChild(shape);

				objects.push(shape);

			}