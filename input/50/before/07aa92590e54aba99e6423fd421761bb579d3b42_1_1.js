function addParticle(){

					// Create a new particle and push it into our array

					var smoke = new SmokeParticle(x,y,radius*2,radius*2,Config);

					particleArray.push(smoke);

			 

					// Add our particle to the particleCanvas sprite, not directly to the stage!

					renderer.addParticle(radius);

			 

			

				}