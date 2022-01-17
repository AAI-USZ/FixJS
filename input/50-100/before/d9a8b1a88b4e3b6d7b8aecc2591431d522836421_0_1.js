function(){
		var widget_data = {
			title : this.component_name,
			output : _("This selector doesn't have an SLA"),
			class_icon : 'widget-weather-icon-info'
		}

		var _html = widget_weather_template.applyTemplate(widget_data);
		this.getEl().update(_html)
	}