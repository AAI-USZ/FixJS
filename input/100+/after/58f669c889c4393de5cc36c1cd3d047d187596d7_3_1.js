function (data, textStatus, jqXHR) {
		var data = data.data;
		for(var i = 0; i < data.length; i++)
			data[i].full_name = 
				data[i].full_name.replace('yiannisk/', '');
		
		core.templates.github.apply(data, function (tplData) {
			$(core.region).hide().html('');
			$(tplData).appendTo($(core.region));
			$(core.region).fadeIn();
		});
	}