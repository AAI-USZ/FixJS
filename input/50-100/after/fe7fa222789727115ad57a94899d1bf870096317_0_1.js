function(settings){
            	var Autostart = (settings.autostart == "on" || settings.autostart == "true" || settings.autostart == true)? true:false;
//                var size = 'width="'+settings.width+'" height="'+settings.height+'"';  // '+size+' // play="false"
                return $('<embed type="'+settings.type+'"autostart="'+Autostart+'" auto="'+Autostart+'" autoplay="'+Autostart+'" allowfullscreen="true" allowScriptAccess="always"  />'
                    ).attr({'src':settings.src , wmode:"window" })
                    .width(settings.width)
                    .height(settings.height); //.html('<noembed>Your browser does not support video</noembed>'); //'Your browser does not support video');
           }