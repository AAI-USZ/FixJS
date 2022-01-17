function(settings){
           	   var obj;

               if($.browser.msie){
                    obj = $('<object data="'+settings.src+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"> </object>');
                }
                else{
					obj = $('<object type="audio/x-wav" data="'+settings.src+'" autoplay="false"> </object>');
                }
               var Autostart = (settings.autostart == "on" || settings.autostart == "true" || settings.autostart == true)? true:false;
				$(obj).append('<param name="src" value="'+settings.src+'" />')
				.append('<param name="controller" value="true" />')
				.append('<param name="autoplay" value="'+Autostart+'" />')
				.append('<param name="autostart" value="'+Autostart+'" />');
				$(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="'+Autostart+'" >');
				$(obj).width(settings.width).height(settings.height);
			$(obj).append($($.aplayer.create_Embed(settings)));
            return obj;
           }