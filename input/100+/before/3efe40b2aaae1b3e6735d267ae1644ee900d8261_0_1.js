function(data){
		log.debug('Build html for ' + this.sla_id,this.logAuthor)
		var widget_data = {}
		
		widget_data.title = data.component
		widget_data.legend = rdr_elapsed_time(data.last_state_change)
		//widget_data.legend = 'since 18/05/08'
		//widget_data.alert_comment = '0:00am to 9:00am'
		widget_data.percent = data.perf_data_array[0].value

		if(data.output && data.output != "")
			widget_data.output = data.output

		if(this.state_as_icon_value){
			var icon_value = 100 - ( data.state / 4 * 100)
			widget_data.class_icon = this.getIcon(icon_value)
		}else{
			if(data.perf_data_array[0])
				widget_data.class_icon = this.getIcon(data.perf_data_array[0].value)
		}
	
		if(this.option_button == true)
			widget_data.button_text = _('Report issue')
			
		widget_data.brick_Component_id = this.id
		
		var _html = widget_weather_template.applyTemplate(widget_data);
		this.getEl().update(_html)
		
		//this.getElements()
	}