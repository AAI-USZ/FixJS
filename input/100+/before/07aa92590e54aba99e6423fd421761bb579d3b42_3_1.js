function(theXLocation, theYLocation, widthSize, heightSize, config){
			
			Config = config;
			
			/**
			 * private variables (instance dependent)
			 */
			var x,y,alpha,rotation,scaleX,scaleY,width,height;
			
			 var xSpeed = 0;
			 var ySpeed = 0;
			 var xAcc = 0;
			 var yAcc = 0;
			 var alphaDecay = 0;
			 var particleTargetAlpha = 0;
			 var particleExpansionRate = 0;
			 var fadeIn = true;
			 var rotationRate = 0;
			 var removed = false;
			
			 ////////////////////
			 /** initialization */				

 
			// Set the initial particle location as passed to our constructor
			x =  randRange(theXLocation-Config.maxXOffset, theXLocation+Config.maxXOffset);
			y = theYLocation;
			width = widthSize;
			height = heightSize;
 
			// Randomise the x and y speed of the particle between a given range
			randomiseSpeeds();
			randomiseAccs();
			// Uncomment this for multi-coloured smoke particles
			//this.randomiseParticleColour();
 
			// Set the alpha our particle will fade in TO
			particleTargetAlpha = randRange(Config.minParticleAlpha, Config.maxParticleAlpha);
 
			// Set our initial particle alpha to be completely transparent
			alpha = 0;
 
			// Set an initial random alpha decay within the given range
			alphaDecay = randRange(Config.minAlphaDecay, Config.maxAlphaDecay);
 
			// Set an initial random rotation within the given range
			rotation = randRange(0, 360);
 
			// Set an initial random scale within the given range
			scaleX = scaleY = randRange(Config.minInitialScale, Config.maxInitialScale);
			particleExpansionRate = randRange(Config.minParticleExpansionRate, Config.maxParticleExpansionRate);
 
			// Set an initial rotation for the particle which is proportional to the
			// particle's initial scale, where bigger particles rotate slower than small ones.
			rotationRate = (minRotationSpeed - (scaleX+scaleY)/2) * rotationModifier;
 
			// Initially, we want our smoke to quickly fade in
			fadeIn = true;
 
			// Because particles can be removed for being transparent or off the stage,
			// as well as for being old, we need to keep track of whether the particle
			// has been removed so we don't remove it twice (i..e for BOTH of these reasons).
			removed = false;
		 	
			//////////////////////////
			
			
			/**
			 * private methods 
			 * Constructor context. 
			 * Declare them here if they use private non static properties, also declared inside the constructor (see above).
			 */
				
				
			/**	
			function randomiseParticleColour()
			{
				var myColourTransform:ColorTransform = this.transform.colorTransform;
	 
				// This will change the color of all layers and all sub-symbols within this symbol:
				//myColourTransform.color = 0xff0000;
	 
				// Shift each colour channel (you can shift in the range: -255 to 255).
				myColourTransform.redOffset   = (Math.random() * 200) - 100; // Range: -255 to +255
				myColourTransform.greenOffset = (Math.random() * 200) - 100; // Range: -255 to +255
				myColourTransform.blueOffset  = (Math.random() * 200) - 100; // Range: -255 to +255
	 
				// This number will multiply by the green channel only (decimal value).  There is also a redMultiplier and blueMultiplier.
				// This will essentially saturate/desaturate the color channel.
				// colorTransform.greenMultiplier = 2;
	 
				// re-assign the ColorTransform back to this symbol
				this.transform.colorTransform = myColourTransform;
			}
			*/
			
			function randomiseSpeeds()
			{
				// Randomise our x and y speeds within a given range
				xSpeed = randRange(Config.minXSpeed, Config.maxXSpeed); 
				ySpeed = randRange(Config.minYSpeed, Config.maxYSpeed);
			}
			
			function randomiseAccs()
			{
				// Randomise our x and y speeds within a given range
				xAcc = randRange(Config.minXAcc, Config.maxXAcc); 
				yAcc = randRange(Config.minYAcc, Config.maxYAcc);
			}
			
			// Destructor to unbind the particle's ENTER_FRAME event listener when we destroy it
			function destroy()
			{
				// Remove the event listener from our particle
				// Note: We're not removing the particle from the stage here because
				// we're going to do that in the flash file
	 
	 
				// Remove the particle from the canvas when the particle is entirely transparent or off the stage
				// Checking our removed property stops us from trying to remove the particle
				// The sooner we can stop drawing the particle, the higher our framerate will be...
				if (removed == false) {
					
					removed = true;
					
				}
			}
			
			// Function to update a particle. Bound to Event.ENTER_FRAME, so called once per frame 
			function update()
			{
				
				// Add our randomised x and y speeds to our particle position
				x += xSpeed;
				y += ySpeed;
				
				xSpeed+=xAcc;
				ySpeed+=yAcc;
	 
				
				
				// Increase the size of our particle as it drifts upwards and then set the new scale
				scaleX += particleExpansionRate;
				scaleY += particleExpansionRate;
				
	 
				// Rotate our particle slightly as it rises
				rotation += rotationRate;
	 
				// If the particle has just been created and is fading in...
				if (fadeIn == true) {
	 
					// ...then fade that bad-boy in already ;)
					alpha += Config.fadeInRate;
	 
					// If our particle's alpha has increased to at least it's target alpha then
					// iwe're done fading in, so set the flag accordingly
					if (alpha >= particleTargetAlpha) {
						fadeIn = false;
					}
				}else{
					// Subtract a small amount from our object's alpha so it fades out
					alpha -= alphaDecay;
				}
				// Unbind the event listener and remove the particle from the stage as soon
				// as the alpha reaches 0 (i.e. particle is completely transparent) OR the particle
				// has risen off the top of the stage to try to eke out a little bit more performance!
				if ( (alpha <= 0) || (y < (0 - height)) ) {
					destroy();
				}
	 
			}
			
			
			/**
			 * public properties
			 * Set initial values
			 */
			
			//a getter and setter in one
			this.x = function(value){ if(value !== undefined){ x = value; }else{ return x;}};
			this.y = function(value){ if(value !== undefined){ y = value; }else{ return y;}};
			
			/**
			 * public methods (instance specific. If changed for one instance, no change occurs in the others)
			 * If these access private properties (declared within this constructor,not static)
			 * they must be defined inside this constructor
			 */
			this.update = update;
			this.destroy = destroy;
			
			this.getX = function(){return x;};
			this.getY = function(){return y;},
			this.getScaleX = function(){return scaleX;};
			this.getScaleY = function(){return scaleY;};
			this.getAlpha = function(){return alpha;};
			this.getRotation = function(){return rotation;};
			this.removed = function(){return removed;};
			
		}