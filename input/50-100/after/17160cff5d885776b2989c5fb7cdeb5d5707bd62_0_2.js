function(){ 
								// If the tutorial gets hidden, stop flashing.
								if(tutorial.hidden){ 
									earthquake.className="";
									window.clearInterval(interval); 
									return; 
									}
								console.log("highlight");
								if(earthquake.className=="highlight") earthquake.className="";
								else earthquake.className="highlight";
								if(selectedEarthquake==1){
									earthquake.className="highlight";
									tutorial.eventFinished();
									window.clearInterval(interval);
								}}