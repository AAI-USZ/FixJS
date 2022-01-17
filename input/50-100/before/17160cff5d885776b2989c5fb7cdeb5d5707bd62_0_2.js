function(){ console.log("highlight");
								if(earthquake.className=="highlight") earthquake.className="";
								else earthquake.className="highlight";
								if(selectedEarthquake==1){
									earthquake.className="highlight";
									tutorial.eventFinished();
									window.clearInterval(interval);
								}}