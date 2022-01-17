function (){
		this.model.trigger('change');
		Datea.hide_big_loading(this.$el);
		if (this.options.success_callback ) {
			this.options.success_callback(this.model);
		}
		if (this.was_new) {
			console.log("NEW DATEO");
			console.log(this.model);
			var base_url = window.location.protocol+'//'+window.location.host;
			var full_url = base_url + this.model.get('url');
			var context = {
				'id': this.model.get('id'),
				'success_msg': this.options.mappingModel.get('"report_success_message'),
				'full_url': full_url,
				'url': this.model.get('url'),
			}
			this.$el.html( ich.map_item_form_success_tpl(context));
			Datea.share.init_add_this();
		}else{
			Datea.modal_view.close_modal();
		}
	}