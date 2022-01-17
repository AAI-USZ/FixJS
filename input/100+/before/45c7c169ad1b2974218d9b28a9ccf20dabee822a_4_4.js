function() {
	var me = this;
	this.input = $a_input(this.input_area, this.df.fieldtype=='Password' ? 'password' : 'text');

	this.get_value= function() {
		var v = this.input.value;
		if(this.validate)
			v = this.validate(v);
		return v;
	}

	this.input.name = this.df.fieldname;
	
	$(this.input).change(function() {
		//me.set_value(me.get_value && me.get_value() || $(this.input).val());
		
		// fix: allow 0 as value
		me.set_value(me.get_value ? me.get_value() : $(this.input).val());
	});
	
	this.set_value = function(val) {
		if(!me.last_value)me.last_value='';

		if(me.validate) {
			val = me.validate(val);
			me.input.value = val==undefined ? '' : val;
		}

		me.set(val);
		if(me.format_input)
			me.format_input();
		if(in_list(['Currency','Float','Int'], me.df.fieldtype)) {
			if(flt(me.last_value)==flt(val)) {
				me.last_value = val;
				return; // do not run trigger
			}
		}
		me.last_value = val;
		me.run_trigger();
	}
	this.input.set_input = function(val) { 
		if(val==null)val='';
		me.input.value = val; 
		if(me.format_input)me.format_input();
	}
	
	// autosuggest type fields
	// -----------------------
	
	if(this.df.options=='Suggest') {
		// add auto suggest
		if(this.suggest_icon) $di(this.suggest_icon);
		$(me.input).autocomplete({
			source: function(request, response) {
				wn.call({
					method:'webnotes.widgets.search.search_link',
					args: {
						'txt': request.term, 
						'dt': me.df.options,
						'query': repl('SELECT DISTINCT `%(fieldname)s` FROM \
							`tab%(dt)s` WHERE `%(fieldname)s` LIKE "%s" LIMIT 50', 
							{fieldname:me.df.fieldname, dt:me.df.parent})
					},
					callback: function(r) {
						response(r.results);
					}
				});
			},
			select: function(event, ui) {
				me.set(ui.item.value);
			}
		});
	}
}