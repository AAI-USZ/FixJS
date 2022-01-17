function do_trial(block, trial)
		{
			// execute trial method
			jsPsych[trial.type]["trial"].call(this, DOM_target, block, trial, 1);
		}