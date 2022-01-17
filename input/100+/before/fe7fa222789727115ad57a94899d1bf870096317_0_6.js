function(settings){
               var obj;

               if($.browser.msie){
                    obj = $('<object type="application/x-shockwave-flash data="'+settings.src+'" ></object>');
                }
                else{
                   obj = $('<object type="application/x-shockwave-flash" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"></object>');
                }
               $(obj).append('<param name="movie" value="'+settings.src+'" />');
               $(obj).append('<param name="quality" value="high" >');
               $(obj).append('<param name="play" value="0" >');
               $(obj).append('<param name="loop" value="0" >');
               $(obj).append('<param name="wmode" value="window" >');
               $(obj).append('<param name="scale" value="showall" >');
               $(obj).append('<param name="menu" value="1" >')
				.append('<param name="play" value="false" >');
//               $(obj).append('<param name="devicefont" value="false" />');
//			    $(obj).append('<param name="salign" value="" />');
//				$(obj).append('<param name="allowScriptAccess" value="sameDomain" />');
				$(obj).width(settings.width)
                .height(settings.height);
               $(obj).append($($.aplayer.create_Embed(settings)).removeAttr('type') );
             //   $(obj).append('<div><h4>Content on this page requires a newer version of Adobe Flash Player.</h4><p><a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif"alt="Get Adobe Flash player" width="112" height="33" /></a></p></div>');
               return obj;
            }