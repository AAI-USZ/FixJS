function(canvasel, x,y,w,h, eventDisp){

				

				var Config = new SmokeConfig();



				

				var eventDispatcher, canvas, renderer;

				

				canvas = canvasel;

				eventDispatcher = eventDisp;

				renderer = new Renderer(canvas);

								

			

				/** initialize */

				/** http://r3dux.org/2010/01/actionscript-3-0-particle-systems-5-smoke-effect/ */

				

				

				// Create the array we'll use for our particles

				var particleArray = new Array();

				 	

						 

				// Add our blur to the canvas sprite we just created.

				// BlurFilter switches: x blur, y-blur-amount, quality (1 = low, 2 = normal, 3 = high)

				// Notice that we're using a number which is a power of 2 for the blur amount;

				// this increases performance because the filters are optimised for powers of 2!

				var blurFilter = new BoxBlurFilter (Config.blurRatio[0]*4, Config.blurRatio[1]*4, 2);

				

				 

				// Blur the entire stage using the below code, if we want to.

				//this.filters = [new BlurFilter(8, 8, 1)];		

				

			 		

				var radius = 5;

				

				function addParticle(){

					// Create a new particle and push it into our array

					var smoke = new SmokeParticle(x,y,radius*2,radius*2,Config);

					particleArray.push(smoke);

			 

					// Add our particle to the particleCanvas sprite, not directly to the stage!

					renderer.addParticle(radius,Config.colors.start);

			 

			

				} 

							

				eventDispatcher.addEventListener("ENTER_FRAME", render);

				

				function render(){

					

					var i;

					for(i=0; i<Config.frequency;i++){

						addParticle();

					}

					

					var prt,length = particleArray.length;

					for (i = 0; i < length; i++) {

						

						prt = particleArray[i];

						prt.update();

						

						if(prt.removed()){

							particleArray.splice(i,1);

							renderer.destroyParticle(i);

							length = particleArray.length;

						}else{

						renderer.updateParticle(i,

								prt.getX(),

								prt.getY(),

								prt.getRotation(),

								prt.getScaleX(),

								prt.getScaleY(),

								prt.getAlpha(),

								prt.getColor()

							);

						

						}

						

					}

					renderer.update();

					blurFilter.applyFilter(canvas.getContext('2d'),0,0,w,h);

				}

			

				/**

				 * ratio	: Array, first element is x, with expected values 2,4 and 8

				 * 			  The second element is y, with the same expected values .

				 */

				function changeBlur(ratio){	

					Config.blurRatio = ratio;

					blurFilter = new BoxBlurFilter (4*Config.blurRatio[0], 4*Config.blurRatio[1], 2);

				}

				

				/** public interface */

				this.setBlurRatio = changeBlur;

				this.setFrequency = function(value){Config.frequency = value;};

				this.setStartColor = function(value){Config.colors.start = value;};

				this.setEndColor = function(value){Config.colors.end = value;};

				

				this.setMaxXOffset = function(value){ Config.maxXOffset = value;};

				this.setMinXSpeed = function(value){ Config.minXSpeed = value;};

				this.setMinYSpeed = function(value){ Config.minYSpeed = value;};

				this.setMaxXSpeed = function(value){ Config.maxXSpeed = value;};

				this.setMaxYSpeed = function(value){ Config.maxYSpeed = value;};

				

				this.setMinXAcc = function(value){ Config.minXAcc = value;};

				this.setMinYAcc = function(value){ Config.minYAcc = value;};

				this.setMaxXAcc = function(value){ Config.maxXAcc = value;};

				this.setMaxYAcc = function(value){ Config.maxYAcc = value;};

				

				this.setFadeInRate = function(value){ Config.fadeInRate = value;};

				this.setMinParticleAlpha = function(value){ Config.minParticleAlpha = value;};

				this.setMaxParticleAlpha = function(value){ Config.maxParticleAlpha = value;};

				this.setMinAlphaDecay = function(value){ Config.minAlphaDecay = value;}; // Keep this value less than fadeInRate!

				this.setMaxAlphaDecay = function(value){ Config.maxAlphaDecay = value;};

		 

				this.setMinInitialScale = function(value){ Config.minInitialScale = value;};

				this.setMaxInitialScale = function(value){ Config.maxInitialScale = value;};

				 

				this.setMinParticleExpansionRate = function(value){ Config.minParticleExpansionRate = value;};

				this.setMaxParticleExpansionRate = function(value){ Config.maxParticleExpansionRate = value;};

//				this.setMinRotationSpeed = function(value){ Config.minRotationSpeed = value;}; // In degrees per frame

//				this.setRotationModifier = function(value){ Config.rotationModifier = value;};

			}