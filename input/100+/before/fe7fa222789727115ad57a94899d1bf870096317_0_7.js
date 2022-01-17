function(settings){
            	//  type="application/x-oleobject"
               var obj = $('<object  type="video/x-ms-asf" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"  url="'+settings.src+'" data="'+settings.src+'" ></object>');
               $(obj).append('<param name="url" value="'+settings.src+'" />'
               		).append('<param name="filename" value="'+settings.src+'" />'
               		).append('<param name="autostart" value="0">'
               		).append('<param name="uiMode" value="full" />'
               		).append('<param name="autosize" value="1">'
               		).append('<param name="playcount" value="1">');
			 $(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width)
                .height(settings.height);
			   $(obj).append('<embed type="audio/wav" play="false" wmode="window" PLUGINSPAGE="http://www.microsoft.com/windows/windowsmedia/download/" src="'+settings.src+'" style="width:'+settings.width+'px; height:'+settings.height+'px;" autostart="false" showcontrols="true"></embed>');
               return obj;
            }