function(settings){

            	var MediaURL = settings.src;
            	
            	var rtsptextrtsp = settings.aplayer_rtsp_php;
            	if(rtsptextrtsp==null){
            		rtsptextrtsp = 'aplayer_rtsp.php';
            	}
//            	rtsptextrtsp += '?path='+(settings.src).replace(/rtsp:\/\/.+\//i, '');
            	rtsptextrtsp += '?path='+settings.src;
            	rtsptextrtsp = (rtsptextrtsp).replace(/aplayer_rtsp\.php/i,'AxisMoviePoster.mov');
            	
            	var ShowAMCToolbar = (settings.controls == "on" || settings.controls == "true" || settings.controls == true)? true:false;
            	var DisplayWidth = settings.width;
            	var DisplayHeight = settings.height + (ShowAMCToolbar? 16 : 0 );
            	var Autostart = (settings.autostart == "on" || settings.autostart == "true" || settings.autostart == true)? true:false;
            	var output = $('<OBJECT id="'+$.aplayer.embedObj_idname+$.aplayer.aplayerNo+'" CLASSID="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" CODEBASE="http://www.apple.com/qtactivex/qtplugin.cab"></OBJECT>')
            		.height(DisplayHeight)
	           		.width(DisplayWidth)
	            	.append('<param name="src" value="'+rtsptextrtsp+'">')
	            	.append('<param name="autoplay" value="'+Autostart+'">')
	            	.append('<param name="controller" value="' + ShowAMCToolbar+ '">')
	            	.append('<param name="qtsrc" value="' + MediaURL + '">')
	            	.append($('<embed src="'+rtsptextrtsp+'"\
	            			name="'+$.aplayer.embedObj_idname+$.aplayer.aplayerNo+'"\
	            			qtsrc="' + MediaURL + '"\
	            			autoplay="'+Autostart+'"\
	            			controller="' + ShowAMCToolbar + '"\
	            			target="myself"\
	            			PLUGINSPAGE="http://www.apple.com/quicktime/download/"></embed>')
	            		.height(DisplayHeight)
	            		.width(DisplayWidth)
	            		.addClass($.aplayer.classElMedia)
	            	);
            	return output;
            }