function() {
            var filePath;
            if (Ti.Platform.osname === 'android'){
              filePath = Ti.Filesystem.getFile(Ti.Filesystem.externalStorageDirectory,"hoge.mp3");
            } else {
              filePath = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "hoge.mp3"); 
            }
            filePath.write(this.responseData);
            
            //Ti.API.info('directoryListing = ' + filePath.getParent().getDirectoryListing());
           
            sound = Ti.Media.createSound({
              url: filePath,
              allowBackground: true
            });
            app.ui.sound = sound;
            
            var startStopButton = Ti.UI.createButton({
              title:'Start/Stop',
              top: 10,
              width:200,
              height:40
            });
            
            view1.add(startStopButton);
            // test
            //sound.setTime(100);
            
            startStopButton.addEventListener("click",function() {
              if (sound.playing){
                //console.log("paused");
                sound.pause();
                //if (Ti.Platform.osname === 'android'){
                //  sound.release();
                //}
              } else {
                //console.log("played");
                sound.play();
              }
            });
            
            sound.addEventListener('complete', function()
            {
              if (Ti.Platform.osname === 'android')
              {
                sound.release();
              }
            });
            
            if (Ti.Platform.osname === 'iphone'){
              var slider = Ti.UI.createSlider({
                top: 50,
                min: 0,
                //max: 100,
                width: '90%',
              });
              
              var label = Ti.UI.createLabel({
                text: slider.value,
                width: '100%',
                height: 'auto',
                top: 30,
                left: 0,
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
              });
              
              // slider plus minus 2 change
              slider.addEventListener('change', function(e) {
                 
                if (e.value > sound.getTime() + 2 || e.value < sound.getTime() - 2 ){
                  //slider.value = e.value;
                  sound.setTime(e.value);
                  console.log("slide: " + e.value);
                  console.log("sound: " + sound.getTime());
                }
              });
            
              slider.max = sound.getDuration();
              slider.value = sound.getTime();
              view1.add(slider);
              
            } else { // android progress
              /*
              var pb=Titanium.UI.createProgressBar({
                top: 50,
                width:"100%",
                height:'auto',
                min:0,
                max: sound.duration,
                //color:'#fff',
                //message:'Downloading 0 of 10',
                //font:{fontSize:14, fontWeight:'bold'},
                style:Ti.UI.iPhone.ProgressBarStyle.PLAIN,
              });
              //pb.max = sound.getDuration();
              //pb.value = Math.round(sound.getTime() / sound.getDuration()*1000)/1000;
              view1.add(pb);
              pb.show();
              console.log("pb max: "+ sound.duration);
              */
            }
            var i = setInterval(function()
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
            },500);
            detailWin.addEventListener('close',function() {
              sound.stop();
              clearInterval(i);
              if (Ti.Platform.osname === 'android')
              {
                sound.release();
              }
            });
        }