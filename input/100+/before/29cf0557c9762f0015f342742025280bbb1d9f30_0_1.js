function(){
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
        }