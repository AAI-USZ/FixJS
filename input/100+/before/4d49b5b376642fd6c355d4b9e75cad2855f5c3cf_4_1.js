function(body, fl) {
		if(!window.make_field) {
			// called in website, load some libs
			wn.require('css/fields.css');
			wn.require('js/fields.js');
		}
		
		$y(this.body, {padding:'11px'});
		this.fields_dict = {}; // reset
		for(var i=0; i<fl.length; i++) {
			var df = fl[i];
			var div = $a(body, 'div', '', {margin:'6px 0px'})
			f = make_field(df, null, div, null);
			f.not_in_form = 1;
			this.fields_dict[df.fieldname] = f
			f.refresh();
			
			// first button primary ?
			if(df.fieldtype=='Button' && !this.first_button) {
				$(f.input).addClass('btn-info');
				this.first_button = true;
			}
		}
	}