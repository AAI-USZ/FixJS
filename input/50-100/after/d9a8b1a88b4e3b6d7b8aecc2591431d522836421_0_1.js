function(){
		log.debug('Build empty brick ' + this.source_id,this.logAuthor)
		var widget_data = {
			title : this.component_name,
			output : _("No data for the selected information"),
			class_icon : 'widget-weather-icon-info'
		}

		var _html = widget_weather_template.applyTemplate(widget_data);
		this.getEl().update(_html)
	}