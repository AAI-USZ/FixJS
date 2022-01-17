function(parent, xmlData, id){
	this.id = id; //id is included as a seperate parameter since there is not id definition in the xml
	this.set_check = {}; //optional, object containing id and whether or not this statement uses set or check
	this.target = null;
	var that = this;
	if ($(xmlData).attr('set')){
		that.set_check.set = $(xmlData).attr('set');
	}
	if ($(xmlData).attr('check')){
		that.set_check.check = $(xmlData).attr('check');
	}
	if ($(xmlData).attr('target')){
		that.target = $(xmlData).attr('target');
	}
	if ($(xmlData).attr('nextTime')){
		that.nextTime = $(xmlData).attr('nextTime');
	}
}