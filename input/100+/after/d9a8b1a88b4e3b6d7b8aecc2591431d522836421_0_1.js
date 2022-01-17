function(data){
		log.debug('Build html for report ' + this.source_id,this.logAuthor)
		
		var widget_data = {}
		widget_data.title = this.component_name
		
		if(data){
			var timestamp = data.values[0][0]
			if(this.data.event_type == "selector"){
				var state = parseInt(data.values[0][1].toString()[0]) //first digit of cps_state
				log.debug('State of ' + this.source_id + ' is: ' + state,this.logAuthor)
				var icon_value = 100 - ( state / 4 * 100)
				widget_data.class_icon = this.getIcon(icon_value)
				widget_data.output = _('State on ' + rdr_tstodate(timestamp/1000))
			}else{
				var cps_pct_by_state_0 = data.values[0][1]
				widget_data.percent = cps_pct_by_state_0
				widget_data.class_icon = this.getIcon(cps_pct_by_state_0)
				widget_data.output = _('SLA on ' + rdr_tstodate(timestamp/1000))
			}
		} else {
			widget_data.class_icon = 'widget-weather-icon-info'
			widget_data.output = _('No data available')
		}
		
		var _html = widget_weather_template.applyTemplate(widget_data);
		this.getEl().update(_html)
	}