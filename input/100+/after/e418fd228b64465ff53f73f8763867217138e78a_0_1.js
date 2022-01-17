function nextStep(err) {
		// If error occurs in the last test, re-throw exception.
		if(err && curIdx == steps.length) { throw err; }

		if(curIdx >= steps.length) { return; }

		var params = new ParamList(nextStep);
		var stepObj = new StepObj(params, jumpTo, steps[curIdx].name);

		stepObj.data = data;

		try {
			steps[curIdx++].apply(stepObj, arguments);
			params.checkPending(); // Handle case where nothing async occurs in the callback
		} catch(e) {
			params.error(e, { name: steps[curIdx - 1].name });
		}
	}