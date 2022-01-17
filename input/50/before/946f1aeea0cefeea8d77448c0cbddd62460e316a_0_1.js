function do_trial(block, trial)
		{
			// call on_trial_start()
			on_trial_start();
		
			// execute trial method
			jsPsych[trial.type]["trial"].call(this, DOM_target, block, trial, 1);
			
			// call on_trial_finish()
			on_trial_finish();
		}