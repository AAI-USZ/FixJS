function(settings){
//                var size = 'width="'+settings.width+'" height="'+settings.height+'"';  // '+size+' // play="false"
                return $('<embed type="'+settings.type+'"autostart="false" auto="false" autoplay="false" allowfullscreen="true" allowScriptAccess="always"  />'
                    ).attr({'src':settings.src , wmode:"window" })
                    .width(settings.width)
                    .height(settings.height); //.html('<noembed>Your browser does not support video</noembed>'); //'Your browser does not support video');
           }