function (event) {
						if (touchIds[event.identifier]) {
							touches[touchIds[event.identifier]].upTime = new Date().getTime();	
						}
					}