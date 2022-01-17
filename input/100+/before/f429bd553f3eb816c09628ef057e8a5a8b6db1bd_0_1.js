function(){


			// Dimensions
			var h = $(this).innerHeight(),
				w = $(this).innerWidth();


			// WebRTC?
			if( false && navigator.getUserMedia ){

				var box = this;

				// success
				var _success = function(stream){

					// Remove any content within the child
					$(box).empty();

					var $el;

					// Is this a video element?
					if($(box).get(0).tagName==='video'){
						$el = $(box);
					}
					//Create a child video
					else{
						// Create a Video element as a child of the element we're binding too.
						$el = $('<video autoplay></video>').css({width:w+'px',height:h+'px'}).appendTo(box);
					}

					// Define as userMedia
					$el.addClass('userMedia');

					var video = $el.get(0);
					video.src = URL ? URL.createObjectURL(stream) : stream;

					video.onerror = function () {
						stream.stop();
						failure();
					};

					success();
				};

				// Call it?
				try{
					navigator.getUserMedia({audio:true,video:true}, _success, failure);
				}
				catch(e){
					try{
						navigator.getUserMedia('audio,video', _success, failure);
					}
					catch(e){
						failure();
					}
				}
			}
			// FLASH
			else{

				// Set some standard config's
				options = {
					quality	: 85,
					swffile	: swf,
					mode	: 'callback',
					width	: w || 215,
					height	: h || 138,
					callback : 'userMedia' // define the function on the window namespace to be used to proxy requests to this API from Flash.
				};

				// Remove any content within the child
				$(this).empty();

				// Inject a flash Object into the element in the page
				$('<object id="XwebcamXobjectX" class="userMedia" type="application/x-shockwave-flash" data="' + options.swffile + '" width="' + options.width + '" height="' + options.height + '"><param name="movie" value="' + options.swffile + '" /><param name="FlashVars" value="mode=' + options.mode + '&amp;quality=' + options.quality + '&amp;callback=' + options.callback + '" /><param name="allowScriptAccess" value="always" /></object>').appendTo(this);

			}
		}