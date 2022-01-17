function(options) {
	var defaults = {
		classes:'form-horizontal formJs',
		additionalClasses: null,
		attributes: null,
		rows: null,
		prefix: Math.floor(Math.random()*100000)+'-'
	}
	var settings = $.extend(defaults, options);
	
	var form = $('<form>');
	form = formJs.addAttributes(form, settings);
	
	$(settings.rows).each( function() {
		form.append(formJs.makeRow(this, settings));
	});
	
	form.append('<div class="form-actions"><button type="submit" class="btn btn-primary">Save changes</button> <button type="reset" class="btn">Cancel</button></div>');
	
	return form;
}