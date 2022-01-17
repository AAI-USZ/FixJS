function(stream) {
              video.attr('src',window.webkitURL.createObjectURL(stream));
              localStream = stream;
              captureSetup();
            }