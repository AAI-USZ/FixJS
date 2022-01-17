function(data){
		if(data.event_type == 'sla'){	
			//build data
			var widget_data = {}
			
			widget_data.title = data.component
			widget_data.output = data.output
			widget_data.legend = rdr_tstodate(data.timestamp)
			widget_data.percent = data.perf_data_array[0].value
			widget_data.class_icon = this.getIcon(widget_data.percent)
			
			if(this.option_button == true)
				widget_data.button_text = _('Report an issue')
				
			widget_data.alert_comment = 'This component will be shut down from 0:00am to 9:00am'
			
			this.build(widget_data)
			log.dump(this.border)
		} else {
			this.wcontainer.update('invalid selector')
		}
	}