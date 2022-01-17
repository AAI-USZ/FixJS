function(target, name, value) {
	var inst = this._getInst(target);
    if (!inst) return null;
    
	var tp_inst = this._get(inst, 'timepicker');
	if (tp_inst) {
		var min = null, max = null, onselect = null;
		if (typeof name == 'string') { // if min/max was set with the string
			if (name === 'minDate' || name === 'minDateTime' )
				min = value;
			else if (name === 'maxDate' || name === 'maxDateTime')
				max = value;
			else if (name === 'onSelect')
				onselect = value;
		} else if (typeof name == 'object') { //if min/max was set with the JSON
			if (name.minDate)
				min = name.minDate;
			else if (name.minDateTime)
				min = name.minDateTime;
			else if (name.maxDate)
				max = name.maxDate;
			else if (name.maxDateTime)
				max = name.maxDateTime;
		}
		if(min) { //if min was set
			if (min == 0)
				min = new Date();
			else
				min = new Date(min);

			tp_inst._defaults.minDate = min;
			tp_inst._defaults.minDateTime = min;
		} else if (max) { //if max was set
			if(max==0)
				max=new Date();
			else
				max= new Date(max);
			tp_inst._defaults.maxDate = max;
			tp_inst._defaults.maxDateTime = max;
		} else if (onselect)
			tp_inst._defaults.onSelect = onselect;
	}
	if (value === undefined)
		return this._base_optionDatepicker(target, name);
	return this._base_optionDatepicker(target, name, value);
}