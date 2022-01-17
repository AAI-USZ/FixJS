function(){
				logger.error("An error in transaction", arguments);
				typeof me.onerror === "function" && me.onerror();
			}