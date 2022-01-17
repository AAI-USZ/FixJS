function(target, noDefault) {
	var inst = this._getInst(target);
    if (!inst) return;
    
    var tp_inst = this._get(inst, 'timepicker');

	if (tp_inst) {
		this._setDateFromField(inst, noDefault);
		var date = this._getDate(inst);
		if (date && tp_inst._parseTime($(target).val(), tp_inst.timeOnly)) date.setHours(tp_inst.hour, tp_inst.minute, tp_inst.second, tp_inst.millisec);
		return date;
	}
	return this._base_getDateDatepicker(target, noDefault);
}