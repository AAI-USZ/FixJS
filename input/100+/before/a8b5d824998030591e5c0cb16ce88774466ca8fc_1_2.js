function() {
	var me = this;
	if((!this.perm[this.df.permlevel]) || (!this.perm[this.df.permlevel][READ]) || this.df.hidden) {
		// no display
		return;
	}

	this.make_row();

	if(this.df.label) {
		if(!this.df.description) 
			this.df.description = '';
		$(this.row.main_head).html(repl('<div class="form-section-head">\
				<h3 class="head">%(label)s</h3>\
				<div class="help small" \
					style="margin-top: 4px; margin-bottom: 8px;">%(description)s</div>\
			</div>', this.df));
	} else {
		// simple
		$(this.wrapper).html('<div class="form-section-head"></div>');
	}

	// collapse section
	this.section_collapse = function() {
		$(me.row.main_head).find('.head')
			.html('<i class="icon-chevron-right"></i> \
				<a href="#" onclick="return false;">Show "' + me.df.label + '"</a>');
		$(me.row.main_body).toggle(false);
		
	}
	
	// expand section
	this.section_expand = function(no_animation) {
		$(me.row.main_head).find('.head')
			.html('<h3><i class="icon-chevron-down" style="vertical-align: middle; margin-bottom: 2px"></i> ' 
				+ me.df.label + '</h3>');
		if(no_animation)
			$(me.row.main_body).toggle(true);
		else
			$(me.row.main_body).slideDown();
	}
}