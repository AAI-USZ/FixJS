function(settings){
               var obj = $('<object id="'+$.aplayer.embedObj_idname+$.aplayer.aplayerNo+'" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab"></object>');
               $(obj).append('<param name="controller" value="true" />')
               	.append('<param name="src" value="'+settings.src+'" />');
               $(obj).append('<param name="wmode" value="window" >')
				.append('<param name="play" value="false" >');
				$(obj).width(settings.width).height(settings.height);
				$(obj).append($($.aplayer.create_Embed(settings))
						.attr({ "TYPE":"image/x-macpaint", 
							'Height' : settings.height, 
							'name' : $.aplayer.embedObj_idname+$.aplayer.aplayerNo }));
               return obj;
            }