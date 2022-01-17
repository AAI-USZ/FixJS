function createBlock(trial_list)
		{
			var block = {
				trial_idx: -1,
			
				trials: trial_list,
				
				data: [],
				
				next: function() {
					this.trial_idx = this.trial_idx+1;
				
					var curr_trial = trial_list[this.trial_idx];
					
					if ( typeof curr_trial == "undefined"){
						return this.done();
					}
					
					do_trial(this, curr_trial);
				},
				
				done: nextBlock,
				
				num_trials: trial_list.length
			}
			
			return block;
		}