function() {
				
					// call on_trial_finish() 
					//     if not very first trial
					//		and 
					if(typeof this.trials[this.trial_idx+1] != "undefined" && (curr_block !=0 || this.trial_idx > -1)) { opts.on_trial_finish() };
					
					this.trial_idx = this.trial_idx+1;
				
					var curr_trial = this.trials[this.trial_idx];
					
					if ( typeof curr_trial == "undefined"){
						return this.done();
					}
					
					// call on_trial_start()
					opts.on_trial_start();
							
					do_trial(this, curr_trial);
				}