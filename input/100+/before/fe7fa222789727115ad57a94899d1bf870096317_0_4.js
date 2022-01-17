function(settings){
			var obj = $('<object type="audio/x-mpeg" data="'+settings.src+'" autoplay="false"> </object>')
				.append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="false" />')
				.append('<param name="autostart" value="0" />');
				$(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width).height(settings.height);
			$(obj).append($($.aplayer.create_Embed(settings)));
            return obj;
           }