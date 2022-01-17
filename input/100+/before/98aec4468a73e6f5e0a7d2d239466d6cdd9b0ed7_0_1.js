function()
            {
              if (sound.playing)
              {
                //Ti.API.info('time ' + sound.getTime());
                if (Ti.Platform.osname === 'iphone'){
                  slider.value = sound.getTime();
                } else {
                  // micro sec
                  //pb.value = sound.getTime();
                  //pb.value = Math.round(sound.getTime() / sound.getDuration()*1000)/1000;
                  //console.log(pb.value);
                }
              }
            }