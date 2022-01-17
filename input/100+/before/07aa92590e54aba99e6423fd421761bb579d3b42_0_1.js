function(canvaselement){

			

			var stage,canvas,objects = [],_x,_y;

 

			

			//radius of the circle Graphics that we will draw.

			var CIRCLE_RADIUS = 3;

	 

			//get a reference to the canvas element

			canvas = canvaselement;

				

			stage = new Stage(canvas);

				

				 

			//Ticker.setFPS(24);

			//Ticker.addListener(this);

			

			this.addParticle = function(size,color){

				var g = new Graphics();

				if(color === undefined) color = Graphics.getRGB(255,255,255,1);

				g.beginFill(color);

				

				g.drawCircle(0,0, size);

				

				var shape = new Shape(g);

				stage.addChild(shape);

				objects.push(shape);

			}

			

			this.numParticles = function(){

				return objects.length;

			}

			

			this.updateParticle = function(index,x,y,rotation,scaleX,scaleY,alpha){

				

				objects[index].x = x;

				objects[index].y = y;

				objects[index].rotation = rotation;

				objects[index].scaleX = scaleX;

				objects[index].scaleY = scaleY;

				objects[index].alpha = alpha;

				

			}

			

			this.update = function()

			{

				stage.update();

			}

		

			this.destroyParticle = function(index){

				stage.removeChild(objects[index]);

				

				delete objects.splice(index,1);

					

			}

		}