function(settings){
            var Autostart = (settings.autostart == "on" || settings.autostart == "true" || settings.autostart == true)? true:false;
			var obj = $('<object type="audio/x-mpeg" data="'+settings.src+'" autoplay="false"> </object>')
				.append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="'+Autostart+'" />')
				.append('<param name="autostart" value="0" />');
				$(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="'+Autostart+'" >');
				$(obj).width(settings.width).height(settings.height);
			$(obj).append($($.aplayer.create_Embed(settings)));
            return obj;
           }