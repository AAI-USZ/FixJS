function(event, element){
				var newState = element.readAttribute("data-state");
				var cb = function(isStandby){
					var text = "Device is now Running";
					switch(this.power.STATES[newState]){
					case this.power.STATES.toggle:
						if(isStandby)
							text = "Device is now in Soft-Standby";
						break;
					case this.power.STATES.deep:
						if(isStandby)
							text = "Device will go into deep standby (if possible, check OSD for messages)";
						else
							text = "Cannot shutdown!";
						break;
					case this.power.STATES.reboot:
						if(isStandby)
							text = "Device will reboot now (if possible, check OSD for messages)";
						else
							text = "Cannot reboot!";
						break;
					case this.power.STATES.gui:
						if(isStandby)
							text = "GUI will restart now (if possible, check OSD for messages)";
						else
							text = "Cannot restart GUI!";
						break;
					}
					this.notify(text, true);
					this.onPowerStateAvailable(isStandby);
				}.bind(this);
				this.power.set(newState, cb);
			}