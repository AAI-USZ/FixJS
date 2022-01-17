function(isStandby){
					var text = "Device is now Running";
					if(isStandby)
						text = "Device is now in Standby";
					this.notify(text, true);
					this.onPowerStateAvailable(isStandby);
				}