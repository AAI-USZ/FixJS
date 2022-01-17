function(){
					logger.log("Transaction completed", arguments);
					typeof me.oncomplete === "function" && me.oncomplete();
				}