function twinklespeedyCallbackDoMultiple(e)
{
	var form = (e.target.form ? e.target.form : e.target);
	var value = Twinkle.speedy.resolveCsdValue(e);
	if (!value) {
		return;
	}

	var normalized = Twinkle.speedy.normalizeHash[value];
	if (value !== 'multiple-finish')
	{
		if (Twinkle.speedy.dbmultipleCriteria.indexOf(normalized) !== -1)
		{
			alert('You already selected that criterion. Please choose another.');
		}
		else
		{
			var parameters = Twinkle.speedy.getParameters(value, normalized, Morebits.status);
			if (parameters)
			{
				for (var i in parameters) {
					if (typeof parameters[i] === 'string') {
						Twinkle.speedy.dbmultipleParameters[i] = parameters[i];
					}
				}
				Twinkle.speedy.dbmultipleCriteria.push(normalized);
			}
		}
		form.style.display = "none"; // give the user a cue that the dialog is being changed
		setTimeout(function() {
			Twinkle.speedy.initDialog(Twinkle.speedy.callback.doMultiple, false, form.dialog);
		}, 150);
	}
	else
	{
		Twinkle.speedy.callback.evaluateUser(e);
	}
}