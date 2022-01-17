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

								prt.getAlpha()

							);

						

						}

						

					}

					renderer.update();

					blurFilter.applyFilter(canvas.getContext('2d'),0,0,w,h);

				}