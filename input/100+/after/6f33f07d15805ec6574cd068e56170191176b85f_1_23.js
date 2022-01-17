function(config, uiiface, filehandler, location) {
    var hasGetUserMedia = function hasGetUserMedia() {
      // Note: Opera builds are unprefixed.
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    };

    var hasNav = false;
    var attachedModes = []; //Stock the attached events
                            //(we don't want to attach them each time a panel is displayed)
    var slider = null;

    var menu = $('nav.query-composition');

    var reset = function() {
      $('.panel').slideUp(config.constants.slideUpAnimationTime);
      $('nav li').removeClass('active');
    };

    var adjust = function() {
      console.log('entered adjust function');

      //Fix canvas width and height in HTML
      //(it appears that CSS is not enough)
      //See http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html#attr-canvas-width for more info
      fixCanvas();

      if(slider) {
        slider.adjustSize($("#query").width());
      }

      var menuWidth = config.constants.menuWidth;
      var overflow = menuWidth - document.width;
      //console.log('document.width: ' + document.width + '| menuWidth: ' + menuWidth);

      if (document.width < menuWidth) {
        // addControls();
        updateSlider( menu );
      } else {
        //removeControls();
        removeSlider( menu );
      }
    };

    var getQueryItemCount = function() {
    	return $(".token-input-list-isearch li").size()-1;
    };

    var updateSlider = function( menu ){
      if( menu.data('swipePanel') ){
        menu.swipePanel('updateContainerWidth');
      } else {
				setTimeout( function(){
					menu.swipePanel({
						container: menu.find('ul')
					});
				}, 1000);
      }
    };

    var removeSlider = function( menu ){
      if( menu.data('swipePanel') ){
        menu.swipePanel('remove');
      }
    };

    var addControls = function() {
     //Add control buttons if they're not here
     if (hasNav === false) {
          $('<a/>', {
            id: 'navButtonLeft',
            href: '#'
          }).appendTo('nav').click(function(){
            shift('right',20);
          });
          $('<a/>', {
            id: 'navButtonRight',
            href: '#'
          }).appendTo('nav').click(function(){
            shift('left',20);
          });
          hasNav = true;
      }
    };

    var removeControls = function() {
      if (hasNav === true) {
        $('nav>a').remove();
        hasNav = false;
      }
    };

    var fixCanvas = function() {

      var formWidth = $("#query").width();
      var $canvas = $("#sketch");

      canvasComputedWidth = Math.floor(0.7 * formWidth);
      if (canvasComputedWidth < 400) {
        $canvas.attr('width',canvasComputedWidth);
        $canvas.attr('height',270);
      } else {
        $canvas.attr('width',400);
        $canvas.attr('height',270);
        console.log("width to 400 and height to 270");
      }
    };

    var shift = function(direction, amount) {
      //Direction must be either 'left' or 'right'
      if (direction !== 'left' && direction !== 'right') {
        return;
      }
      if (direction === 'left') {
        //A shift-left of 20px is the same as a shift-right by -20px
        amount = -amount;
        direction = 'right';
      }
      console.log('will shift menu to ' + direction + ' from ' + amount + 'px');
      var originalMarginInPx = $('nav ul').css('margin-left');
      var originalMargin = parseInt(originalMarginInPx.substring(0,originalMarginInPx.length - 2)); //Drops the "px"

      console.log('margin is currently' + originalMargin);
      var newMargin = originalMargin + parseInt(amount);
      console.log('new margin: ' + newMargin);
      $('nav ul').css('margin-left', newMargin);
      /* TODO: Take into account margins, padding */
      // if ( !((originalMargin >= 0-amount && direction === 'right')
      //       || (originalMargin <= -com.isearch.menu.overflow + amount  && direction === 'right')) ) {
      //   var newMargin = originalMargin + amount;
      //   $('nav ul').css('margin-left', newMargin);
      // }
    };

    var getRequestedMode = function(jQueryObject) {
      //the requested "mode", i.e "audio", "picture",...
      //is stored in the "data-mode" html5 attribute of the DOM elt.
      return jQueryObject.attr('data-mode');
    };

    var showPanel = function(mode) {
      $('.' + mode).slideDown(config.constants.slideDownAnimationTime);
      attachEvents(mode);
    };

    var hidePanels = function() {
      $('.panel').slideUp(config.constants.slideUpAnimationTime);
    };

    var attachEvents = function(mode) {

      if (mode === 'text' && !isAttached('text')) {
        attachTextEvents();
      } else if (mode === 'geolocation' && !isAttached('geolocation')) {
        attachGeolocationEvents();
      } else if (mode === '3d' && !isAttached('3d')) {
        attach3dEvents();
      } else if (mode === 'picture' && !isAttached('picture')) {
        attachPictureEvents();
      } else if (mode === 'video' && !isAttached('video')) {
        attachVideoEvents();
      } else if (mode === 'emotion' && !isAttached('emotion')) {
        attachEmotionEvents();
      } else if (mode === 'sketch' && !isAttached('sketch')) {
        attachSketchEvents();
      } else if (mode === 'sound' && !isAttached('sound')) {
        attachSoundEvents();
      } else if (mode === 'rhythm' && !isAttached('rhythm')) {
        attachRhythmEvents();
      } else {
        console.log('Didn\'t attach the event for mode ' + mode);
        return;
      }
    };

    var isAttached = function(mode) {
      //is a mode attached to the menu? (i.e events bound)
      if($.inArray(mode, attachedModes) === -1) {
        return false;
      }
      return true;
    };

    var attachTextEvents = function() {
      $('.panel.text input').click(function(){
        $(this).val('');
      });
      $('.panel.text button').click(function(){
        console.log('Text button clicked');

        var textIcon = $('nav li[data-mode="text"]');
        textIcon.addClass('uploading');

        var textBox = $('.panel.text input');
        var searchQuery = textBox.val();
        console.log('Search term is ' + searchQuery);

        //Transfer the query to the main field via tokenInput
        $("#query-field").tokenInput('add',{id:searchQuery,name:searchQuery});
        //Remove the "uploading style" | Note: this won't be visible, hopefully
        textIcon.removeClass('uploading');
        //Empty the text field of the panel
        textBox.val('');

        reset();
        attachedModes.push('text');
      });
    };

    /**
     * Triantafillos: find real location with HTML5 geo-location API.
     */
    var attachGeolocationEvents = function() {
      $('.panel.geolocation #getCurrentLocation').click(function(){
        console.log('Button geolocation pressed');

        var geoIcon = $('nav li[data-mode="geolocation"]');
        geoIcon.addClass('uploading');

        location.getCurrentLocation(function(position) {
          $("#query-field").tokenInput('add',{id:"geo",name:'<img src="img/fake/fake-geolocation.jpg" title="'+position.coords.latitude+" "+position.coords.longitude+'" class="Location" data-mode="Image" />'});
          geoIcon.removeClass('uploading');
          reset();
          attachedModes.push('geolocation');
        });

      });

	  $('.panel.geolocation #chooseLocation').click(function(){
    	location.showMap(function(lat, lon){
    	  $("#query-field").tokenInput('add',{id:"geo",name:'<img src="img/fake/fake-geolocation.jpg" title="'+lat+" "+lon+'" class="Location" data-mode="Image" />'});
          reset();
          attachedModes.push('geolocation');
    	});
      });

    };

    var attachEmotionEvents = function() {

      // emotions slider initialization
      var div = document.getElementById("emotion-slider");
      slider = new SmileySlider(div);
      var first = true;
      // start with neutral emotions
      slider.position(0.5);
      var emotionIcon = $('nav li[data-mode="emotion"]');
      // get the smiley canvas
      var canvas = $("#emotion-slider canvas:first")[0];
      var emotionTimeout = null;
      slider.position(function(p) {
        emotionIcon.addClass('uploading');
        if (!first && p != 0.5) {
          if (emotionTimeout) {
            clearTimeout(emotionTimeout);
          }
          emotionTimeout = setTimeout(function() {
            $("#query-field").tokenInput("remove", {id: "emotion"});
            $("#query-field").tokenInput('add',{id:"emotion",name:'<img src="' +
                canvas.toDataURL("image/png") + '" title="' + p + '" class="Emotion" data-mode="Image" />'});
          }, 200);
        }

        first = false;
        //Remove the "uploading style" | Note: this won't be visible, hopefully
        emotionIcon.removeClass('uploading');

        //reset();
        attachedModes.push('emotion');

      });
    };


    var attach3dEvents = function() {

    	//Drag and Drop of files
	    var handler = new filehandler.FileHandler('threedDrop',['dae','3ds'],config.constants.fileUploadServer,getQueryItemCount());
	    var pictureIcon = $('nav li[data-mode="3d"]');

	    uiiface.registerEvent('threedDrop','drop',function(event) {

	    	pictureIcon.addClass('uploading');

	    	$.proxy(handler.handleFiles(event.originalEvent),handler);
	    	$('#threedDrop').removeClass("over");

	    	reset();
	      attachedModes.push('3d');
	    });

	    //Invisible file input
	    $('#threedUpload').change(function(event) {

	    	$.proxy(handler.handleFiles(event),handler);

			event.preventDefault();
			return false;
	    });

	    //Trigger button for file input
	    $('.panel.3d button').click(function(){
        console.log('Button 3d pressed');
        pictureIcon.addClass('uploading');

        $('#threedUpload').click();

        reset();
        attachedModes.push('3d');

      });
    };

    var attachPictureEvents = function() {

    	//Drag and Drop of files
	    var handler = new filehandler.FileHandler('imageDrop',['jpg','png','gif'],config.constants.fileUploadServer,getQueryItemCount());
	    var pictureIcon = $('nav li[data-mode="picture"]');

	    //Drop trigger for image upload
	    uiiface.registerEvent('imageDrop','drop',function(event) {

	    	pictureIcon.addClass('uploading');

	    	$.proxy(handler.handleFiles(event.originalEvent),handler);
	    	$('#imageDrop').removeClass("over");

	    	reset();
	      attachedModes.push('3d');

	    });

	    //Invisible file input
	    $('#imageUpload').change(function(event) {

	    	$.proxy(handler.handleFiles(event),handler);
	    	event.preventDefault();
	    	return false;

	    });
	    //Trigger button for file input
	    $('.panel.picture button.upload').click(function(){

	      pictureIcon.addClass('uploading');
	    	$('#imageUpload').click();

	    	reset();
	      attachedModes.push('picture');
	    });

	    addMediaCapture('picture');
    };

    var attachVideoEvents = function() {

    	//Drag and Drop of files
	    var handler = new filehandler.FileHandler('videoDrop',['webm','mp4','avi','ogv'],config.constants.fileUploadServer,getQueryItemCount());
	    var videoIcon = $('nav li[data-mode="video"]');

	    //Drop trigger for video upload
	    uiiface.registerEvent('videoDrop','drop',function(event) {

	    	videoIcon.addClass('uploading');

	    	$.proxy(handler.handleFiles(event.originalEvent),handler);
	    	$('#videoDrop').removeClass("over");

	    	reset();
	      attachedModes.push('video');
	    });

	    //Invisible file input
	    $('#videoUpload').change(function(event) {

	    	$.proxy(handler.handleFiles(event),handler);

	    	event.preventDefault();
	    	return false;
	    });
	    //Trigger button for file input
	    $('.panel.video button.upload').click(function(){

	        videoIcon.addClass('uploading');

	    	$('#videoUpload').click();

	    	reset();
	        attachedModes.push('video');
	    });

	    addMediaCapture('video');
    };

    var attachSketchEvents = function() {

      $('#sketch').uiiface('sketch');

    	uiiface.registerEvent('sketch','delete',function(error) {

	    	if(error <= 0.4) {
	    		console.log('delete gesture detected with error: ' + error);
	    		var canvas = $('#sketch')[0];
	    		var context = canvas.getContext('2d');
	    		context.clearRect(0, 0, canvas.width, canvas.height);
	    	}
	    });


      $('.panel.sketch button.done').click(function(event){

        console.log('Button "sketch done" pressed');
        //We don't need to bind it to
        var handler = new filehandler.FileHandler('sketch',['png'],config.constants.fileUploadServer,getQueryItemCount());

        var sketchIcon = $('nav li[data-mode="sketch"]');
        sketchIcon.addClass('uploading');

        //----
        $.proxy(handler.handleCanvasData(),handler);

        reset();
        attachedModes.push('sketch');
        //----

        event.preventDefault();
        return false;

      });
    };

    var attachSoundEvents = function() {

    	//Drag and Drop of files
	    var handler = new filehandler.FileHandler('soundDrop',['oga','ogg','mp3','wav'],config.constants.fileUploadServer,getQueryItemCount());
	    var pictureIcon = $('nav li[data-mode="sound"]');

	    uiiface.registerEvent('soundDrop','drop',function(event) {

	    	pictureIcon.addClass('uploading');

	    	$.proxy(handler.handleFiles(event.originalEvent),handler);
	    	$('#soundDrop').removeClass("over");

	    	reset();
	        attachedModes.push('sound');
	    });

	    //Invisible file input
	    $('#soundUpload').change(function(event) {

	    	$.proxy(handler.handleFiles(event),handler);

			event.preventDefault();
			return false;
	    });

	    //Trigger button for file input
	    $('.panel.sound button.upload').click(function(){

	      pictureIcon.addClass('uploading');

	    	$('#soundUpload').click();

	    	reset();
	      attachedModes.push('sound');
	    });

  		// sound recording
  		$('.panel.sound button.record').click(function(){

  			pictureIcon.addClass('uploading');
  			if ( $(this).text() == "Start" )
  			{
  				$(this).text("Stop") ;
  				Wami.startRecording(config.constants.fileUploadServer + "?" + "audiorec") ;
  			}
  			else
  			{
  				Wami.setUploadCallback(
  					function(data)
  					{
  						var fileInfo = $.parseJSON(data[0]) ;

  						var id = "fileQueryItem" + getQueryItemCount();
  						var token = '<audio controls="controls" id="' + id + '" ></audio>';

  						$("#query-field").tokenInput('add',{id:id, name:token});

  						//set the appropriate data tags for the html element
  						var ele = $('#' + id) ;
  						ele.attr({
  							'alt'       : fileInfo.name,
  							'class'     : fileInfo.subtype,
  							'data-mode' : "SoundType",
  							'preload': 'auto',
  							'data-token':fileInfo.token
  						});

    					for ( var i=0 ; i<fileInfo.path.length ; i++ )
    					{
    						var url = fileInfo.path[i].url ;
    						var mime = fileInfo.path[i].mime ;

    						$('<source/>', { src: url, type: mime }).appendTo(ele) ;
    					}

  						reset();
  						attachedModes.push('sound');
  					}
  				) ;

  				Wami.stopRecording() ;
  				$(this).text("Start") ;
  			}
  	  });

    };

    var attachRhythmEvents = function() {

    	//Drag and Drop of files
	    var handler = new filehandler.FileHandler('rhythmDrop',['oga','ogg','mp3','wav'],config.constants.fileUploadServer,getQueryItemCount());
	    var rhythmIcon = $('nav li[data-mode="rhythm"]');

	    uiiface.registerEvent('rhythmDrop','drop',function(event) {

	    	rhythmIcon.addClass('uploading');

	    	$.proxy(handler.handleFiles(event.originalEvent),handler);
	    	$('#rhythmDrop').removeClass("over");

	    	reset();
	        attachedModes.push('rhythm');
	    });

	    //Invisible file input
	    $('#rhythmUpload').change(function(event) {

	    	$.proxy(handler.handleFiles(event),handler);

			event.preventDefault();
			return false;
	    });

	    //Trigger button for file input
	    $('.panel.rhythm button.upload').click(function(){

	      rhythmIcon.addClass('uploading');

	    	$('#rhythmUpload').click();

	    	reset();
	      attachedModes.push('rhythm');
	    });

	   //Rhythm tapping initialization
	   $('#rhythm-progress').attr({
	     'value' : 0,
	     'max'   : 10
	   });
	   $('#rhythm-canvas').attr({
       'width'  : 200,
       'height' : 20
     });

	   // initial state
	   var tapRhythm = {
	     disabled : false,
	     running  : false,
	     start    : 0,
	     timer    : false,
	     scalef   : parseInt($('#rhythm-canvas').attr('width')) / parseInt($('#rhythm-progress').attr('max')),
	     context  : $('#rhythm-canvas')[0].getContext('2d'),
	     data     : {
	       duration : 0,
	       taps : [],
	       intervals : []
	     }
	   };

	   // draw scale function
     var drawScale = function() {
       tapRhythm.context.fillStyle = 'rgb(200,0,0)';
       tapRhythm.context.clearRect (0 , 0, parseInt($('#rhythm-canvas').attr('width')), parseInt($('#rhythm-canvas').attr('height')));
       var i = 0;
       var x = 0;
       tapRhythm.context.fillStyle = 'rgb(0,0,0)';
       while(x <= $('#rhythm-canvas').attr('width')) {
         x = tapRhythm.scalef * i;
         tapRhythm.context.fillRect (x, 18, 1, 2);
         i++;
       }
       tapRhythm.context.fillStyle = 'rgb(200,0,0)';
     };

     //initially draw the scale
     drawScale();

     $('.panel.rhythm #rhythm-div').dblclick(function() {
       return false; // no-op
     });

     $('.panel.rhythm #duration-spinner').on('change', function(e) {
       $('#rhythm-progress').attr('max', $(this).val());
       $('#rhythm-progress').attr('value', 0);
     });

	   $('.panel.rhythm #rhythm-div').click(function() {
       // on rhythm div click
       if (tapRhythm.disabled) {
         return;
       }
       // if state is "not running"
       if (!tapRhythm.running) {
         // set state to "running"
         $(this).text('Tap');
         //Reset rhythm elements
         tapRhythm.running = true;
         $('#rhythm-progress').attr('value', 0);
         drawScale();
         $('#duration-spinner').attr('disabled','disabled');
         tapRhythm.start = new Date().getTime();
         tapRhythm.scalef = parseInt($('#rhythm-canvas').attr('width')) / parseInt($('#rhythm-progress').attr('max'));

         //set data duration
         tapRhythm.data.duration = parseInt($('#rhythm-progress').attr('max'));

         // set timer
         tapRhythm.timer = setInterval(function() {
           // calculate the elapsed time since the beginning of the timer
           var elapsed = Math.floor((new Date().getTime() - tapRhythm.start) / 1000);
           $('#elapsed-span').text(elapsed);
           $('#rhythm-progress').attr('value',elapsed);

           // if the timer has ended
           if (elapsed >= tapRhythm.data.duration) {
             // set state to "not running"
             clearInterval(tapRhythm.timer);
             tapRhythm.disabled = true;
             $(this).text('Finished');

             setTimeout(function() {
               tapRhythm.disabled = false;
               $('#rhythm-div').text('Start');
             }, 5000);

             $('#duration-spinner').attr('disabled','');
             tapRhythm.running = false;
             tapRhythm.start = 0;
             tapRhythm.timer = false;

             //Calculate relative intervals from taps
             var oldInterval = false;

             for(var i=1; i < tapRhythm.data.taps.length; i++) {
               var interval = tapRhythm.data.taps[i] - tapRhythm.data.taps[i-1];
               if(oldInterval) {
                 tapRhythm.data.intervals.push(interval / oldInterval);
               }
               oldInterval = interval;
             }

             console.log(tapRhythm.data);
             //Append rhythm to search bar
             $("#query-field").tokenInput('add',{id:"rhythm",name:'<img src="' +
               $('#rhythm-canvas')[0].toDataURL("image/png") + '" title="' + tapRhythm.data.intervals.join(',') + '" class="Rhythm" data-mode="text" data-duration="' + tapRhythm.data.duration + '" />'});
           }
         }, 1000);
       // if state is "running"
       } else {
         $(this).toggleClass('tapped');
         setTimeout(function() {
           $('#rhythm-div').toggleClass('tapped');
         }, 100);
         var heartBeat = (new Date().getTime() - tapRhythm.start) / 1000;
         tapRhythm.data.taps.push(heartBeat);
         var x = Math.floor(tapRhythm.scalef * heartBeat);
         tapRhythm.context.fillRect(x, 0, 1, parseInt($('#rhythm-canvas').attr('height')));
       }
	   });

		 // rhythm recording
     $('.panel.rhythm button.record').click(function(){

      rhythmIcon.addClass('uploading');

      if ( $(this).text() == "Start" )
      {
      	$(this).text("Stop") ;
      	Wami.startRecording(config.constants.fileUploadServer + "?" + "audiorec") ;
      }
      else
      {
      	Wami.setUploadCallback(
      		function(data)
      		{
      			var fileInfo = $.parseJSON(data[0]) ;

      			var id = "fileQueryItem" + getQueryItemCount();
      			var token = '<audio controls="controls" id="' + id + '" ></audio>';

      			$("#query-field").tokenInput('add',{id:id, name:token});

      			//set the appropriate data tags for the html element
      			var ele = $('#' + id) ;
      			ele.attr({
      				'alt'       : fileInfo.name,
      				'class'     : fileInfo.subtype,
      				'data-mode' : "SoundType",
      				'preload': 'auto',
      				'data-token':fileInfo.token
      			});

      			for ( var i=0 ; i<fileInfo.path.length ; i++ )
      			{
      				var url = fileInfo.path[i].url ;
      				var mime = fileInfo.path[i].mime ;

      				$('<source/>', { src: url, type: mime }).appendTo(ele) ;
      			}

      			reset();
      			attachedModes.push('rhythm');
      		}
      	);

      	Wami.stopRecording() ;
      	$(this).text("Start") ;
      }
     });
    };

    /*
     * addMediaCapture - test if media can be captured via HTML getUserMedia
     * and handles all capturing and streaming
     */
    var addMediaCapture = function(type) {

      var type = type || 'picture';
      var icon = $('nav li[data-mode="' + type + '"]');

      if (hasGetUserMedia()) {
        // Good to go!
        var localStream = { stop: function() {} };

        var videoHandle = function(){
          console.log('Button "Shoot ' + type + '" pressed');

          var video = $('.panel.' + type + ' .device video');
          var canvas = $('.panel.' + type + ' .device canvas');
          var button = $(this);

          var onFailSoHard = function(e) {
            console.log('Reeeejected!', e);
            alert('Sorry, can\'t access the camera.');
          };

          var captureSetup = function() {
            video.parent().show();

            //Abort/Show button handling
            button.text('Abort');

            button.off('click');
            button.one('click', function(event) {
              event.stopPropagation();
              localStream.stop();
              video.attr('src','');
              video.parent().find('button').hide();
              video.parent().hide();
              $(this).text('Show camera');

              button.on('click', videoHandle);
              return false;
            });

            //Canvas handling
            var ctx = canvas[0].getContext('2d');
            var drawCanvasHint = function(ctx) {
              ctx.fillStyle = '#333';
              ctx.strokeStyle = '#fff';
              ctx.font = 'bold 20px sans-serif';
              ctx.strokeText('Click or tap to take ' + type, 55, 30);
              ctx.fillText('Click or tap to take ' + type, 55, 30);
            };
            drawCanvasHint(ctx);

            var canvasClick = function(event) {
              if(type === 'picture') {
                ctx.drawImage(video[0], 0, 0, 352, 288);
              } else if(type === 'video') {
                ctx.clearRect(0,0,canvas[0].width, canvas[0].height);
                //start sending the stream to the server
                console.dir(localStream);
                //localStream.videoTracks[0]
              }
              video.parent().find('button').show();
            };

            canvas.one('click', canvasClick);

            //Token and recapture handler
            var useBtn = video.parent().find('.use');
            var newBtn = video.parent().find('.new');

            useBtn.one('click', function(event) {
              if(type === 'picture') {
                icon.addClass('uploading');

                //For pictures use the good old file uploader
                var handler = new filehandler.FileHandler('imageCapture',['png'],config.constants.fileUploadServer,getQueryItemCount());
                $.proxy(handler.handleCanvasData('capturedImage.png','image/png',''),handler);
              } else if(type === 'video') {
                //For we videos we now stop sending data to the server
                localStream.stop();
              }
              reset();
              attachedModes.push(type);
              icon.removeClass('uploading');

              ctx.clearRect(0,0,canvas[0].width, canvas[0].height);
              button.trigger('click');
            });

            newBtn.on('click', function(event) {
              video.parent().find('button').hide();
              ctx.clearRect(0,0,canvas[0].width, canvas[0].height);
              drawCanvasHint(ctx);
              canvas.one('click', canvasClick);
            });
          };

          //Opera
          if (navigator.getUserMedia) {
            navigator.getUserMedia({audio: true, video: true}, function(stream) {
              video.attr('src',stream);
              captureSetup();
            }, onFailSoHard);
          //Webkit
          } else if (navigator.webkitGetUserMedia) {
            navigator.webkitGetUserMedia('audio, video', function(stream) {
              video.attr('src',window.webkitURL.createObjectURL(stream));
              localStream = stream;
              captureSetup();
            }, onFailSoHard);
          }

          event.preventDefault();
          return false;
        };

        $('.panel.' + type + ' button.shoot').click(videoHandle);
      } else {
        $('.panel.' + type + ' button.shoot').parent().remove();
        console.log('getUserMedia() is not supported in your browser');
      }
    };

    /*
     * Menu behaviour when the query is submitted
     */
    var collapse = function() {
      $(".query-composition").hide();
      $("header h1").hide();
      /**
       * Triantafillos: hide panel in case it was open.
       */
      $(".panel").hide();
      /** Triantafillos: added top property so that the query form
  	   *  on top of visualization is not cropped by the settings bar.
  	   */
      $("#query").css("top", "2.8em");
       /** Triantafillos: restart button.
  	   */
      if($('#restart').length == 0) {
        $("#query").append('<a href="#" id="restart">Start from scratch</a>');

        $("#restart").button();
        $("#restart").click(function(){ window.location = ""; });
      }
    };



    return {
      attachEvents: attachEvents,
      collapse: collapse,
      showPanel: showPanel,
      hidePanels: hidePanels,
      getRequestedMode: getRequestedMode,
      adjust: adjust,
      reset: reset
    };

  }