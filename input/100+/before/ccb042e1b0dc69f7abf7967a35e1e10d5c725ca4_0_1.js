function(){
		if (!dojo.getAttr(this.form_field, 'id')) {
			dojo.setAttr(this.form_field, 'id', this.generate_random_id());
		}
		
		this.container_id = this.form_field.id.replace(/(:|\.)/g, '_') + "_chzn";

		this.f_width = dojo.position(this.form_field).w;	
	
		this.default_text = dojo.getAttr(this.form_field, 'data-placeholder') ? dojo.getAttr(this.form_field, 'data-placeholder') : "Select Some Options";
	
		this.container = dojo.create('div', {
			id: this.container_id,
			class: 	'chzn-container'+ (this.is_rtl ? ' chzn-rtl' : '') + " chzn-container-" + (this.is_multiple ? "multi" : "single"),
			style: 'width: ' + this.f_width + 'px'			
		});
	
		if (this.is_multiple){
			this.container.innerHTML = '<ul class="chzn-choices"><li class="search-field"><input type="text" value="' + this.default_text + '" class="default" autocomplete="off" style="width:25px;" /></li></ul><div class="chzn-drop" style="left:-9000px;"><ul class="chzn-results"></ul></div>';
		} else {
			this.container.innerHTML = '<a href="javascript:void(0)" class="chzn-single"><span>' + this.default_text + '</span><div><b></b></div></a><div class="chzn-drop" style="left:-9000px;"><div class="chzn-search"><input type="text" autocomplete="off" /></div><ul class="chzn-results"></ul></div>';
		}	
	
		dojo.setStyle(this.form_field, 'display', 'none')
		dojo.place(this.container, this.form_field, 'after');
		
		this.dropdown = dojo.query('div.chzn-drop', this.container).shift();
				
		var dd_top = dojo.position(this.container, false).h;
						
		var dd_width = this.f_width - (dojo.position(this.dropdown).w - dojo.contentBox(this.dropdown).w);
		dojo.setStyle(this.dropdown, {
			'width': dd_width + "px",
			'top': dd_top + "px"
		});
		
	
	
		this.search_field = dojo.query('input', this.container).shift(); 			
		this.search_results = dojo.query('ul.chzn-results', this.container).shift();
		this.search_field_scale();
		this.search_no_results = dojo.query('li.no-results', this.container).shift();
		
		
		if (this.is_multiple){
			this.search_choices = dojo.query('ul.chzn-choices', this.container).shift();
			this.search_container = dojo.query('li.search-field', this.container).shift();
		} else {
			this.search_container = dojo.query('div.chzn-search', this.container).shift();
			this.selected_item = dojo.query('.chzn-single', this.container).shift();
	
			var sf_width = dd_width - (dojo.position(this.search_container).w - dojo.contentBox(this.search_container).w) - (dojo.position(this.search_field).w - dojo.contentBox(this.search_field).w);
			dojo.setStyle(this.search_field, 'width', sf_width + 'px');
		}
	
		this.results_build();
		this.set_tab_index();
		//this.form_field.fireEvent('liszt:ready', this);
		
	}