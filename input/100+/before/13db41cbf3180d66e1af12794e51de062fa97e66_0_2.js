f    var win = Ti.UI.createWindow({
      title: _title,
      backgroundColor: '#fff'
    });
    
    var tab = Ti.UI.createTab({
      title: _title,
      //icon: 'KS_nav_views.png',
      window: win
    });
   
    var tableView = Ti.UI.createTableView({
      data: [
        //{title:"Foo", link: "http://yahoo.co.jp" ,color: "#000", hasDetail: true},
        //{title:"Bar", link: "http://google.co.jp" ,color: "#000", hasDetail: true},
        //{title:"Hoge", link: "http://twitter.jp" ,color: "#000", hasDetail: true}
      ]
    });
    win.add(tableView);
    
    // Rss Read
    win.addEventListener('open', function(){
      var query = String.format("select * from rss where url = '%s'",_url);
      Ti.Yahoo.yql(query,function(response){
        if (response.success === false){
          alert("Yahoo YQL error.");
          return;
        }
        response.data.item.forEach(function(item){
          var link = item.link.match(/[0-9]+.html$/);
          link = 'http://m.voanews.com/learningenglish/' + link + '?show=full';
          tableView.appendRow({title: item.title, color: '#000', link: link, hasChild: true});
        });
      });
    });
    
    // List View Create
    tableView.addEventListener("click",function(evt){
      
      // before sound remove
      var sound = app.ui.sound;
      if (sound){
        sound.stop();
      }
      
      var view1 = Ti.UI.createView({
        //backgroundColor: 'red'
      });
      
      var view2 = Ti.UI.createView({
        //backgroundColor: 'blue'
      });
      
      //alert(event.rowData.title);
      var detailWin = Ti.UI.createWindow({
        title: evt.rowData.title,
        backgroundColor: "#fff"
      });
      
      // text download
      var xpath = '//p[@class="article_body_text"]';
      var query = String.format("select * from html where url = '%s' and xpath='%s'",evt.rowData.link,xpath);
      //console.log(query);
      Ti.Yahoo.yql(query,function(response){
        if (response.success === false){
          alert("Yahoo YQL error.");
          return;
        }
        var text = response.data.p.content;
        var scrollView = Titanium.UI.createScrollView({
          contentWidth:'auto',
          contentHeight:'auto',
          top:80,
          bottom: 0,
          showVerticalScrollIndicator:true,
          showHorizontalScrollIndicator:true
        });
        
        var l1 = Titanium.UI.createLabel({
          text: text,
          width:"98%",
          height:"auto",
          top:0,
          color:'#000',
          textAlign:'left'
        });
        scrollView.add(l1);
        //scrollView.scrollTo("auto", "auto");
        view1.add(scrollView);
      });
      
      // mp3 download
      var xpath = '//a[contains(text(), \"Listen to this article\")]/@href';
      var query = String.format("select * from html where url = '%s' and xpath='%s'",evt.rowData.link,xpath);
      Ti.Yahoo.yql(query,function(response){
        if (response.success === false){
          alert("Yahoo YQL error.");
          return;
        }
        var link = response.data.a.href;
        
        var mp3 = Ti.Network.createHTTPClient();
        mp3.open('GET',link);
        mp3.onload  = function() {
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
            win.addEventListener('close',function() {
              sound.stop();
              clearInterval(i);
              if (Ti.Platform.osname === 'android')
              {
                sound.release();
              }
            });
            
            //win.leftNavButton = backBtn;
            //Ti.UI.currentWindow.leftNavButton.addEventListener('click', function(e){
            /*
            tab.leftNavButton.addEventListener('click', function() {
              console.log(1);
              sound.pause();
              sound.stop();
              clearInterval(i);
              if (Ti.Platform.osname === 'android')
              {
                sound.release();
              }
            });
            */
        }
        mp3.send();
      });
      //Ti.UI.currentWindow.addEventListener("click", function(){
      //  console.log(2);
      //});
      /*
      view1.addEventListener('blur', function(e){
        console.log(1);
      });
      view1.addEventListener('focus', function(e){
        console.log(1);
      });
      */
      var scrollView = Titanium.UI.createScrollableView({
        views: [view1,view2],
        showPagingControl: true,
        pagingControlHeight: 30,
        maxZoomScale: 2.0
      });
      detailWin.add(scrollView);
      
      tab.open(detailWin);
      
    });
    
    return tab;
  };
