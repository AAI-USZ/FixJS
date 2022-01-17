function(data) {

		streaming = $('#streaming');

		var status = data.status;

		var message = data.message;

		var url = data.url;

		var time = new Date();

		var thumbwidth = streaming.find('span[rel="thumbwidth"]').text();

		var thumbheight = streaming.find('span[rel="thumbheight"]').text();

		streaming.find('ul[class="streamstatus"]').find('span[class="mode"]').html(message);

		if ( status == "ready" ) {

			streaming.find('#player').removeAttr("style");	

			playerWidth=window.innerWidth/2;

			playerHeight=(playerWidth*480)/640;

			var playerPlugin='';

			if (debugadaptive)

				jwplayer("mediaplayer").setup({

					width: playerWidth,height: playerHeight,

					plugins: { 'swf/qualitymonitor.swf' : {} },

					modes: [

						{ type:'flash', src:'swf/player.swf', config: { provider:'swf/adaptiveProvider.swf', file:'ram/sessions/session' +session +'/stream.m3u8' } },

						{ type:'html5', config: { file:'ram/sessions/session' +session +'/stream.m3u8' } }

					]});

			else

				jwplayer("mediaplayer").setup({

					width: playerWidth,height: playerHeight,

					modes: [

						{ type:'flash', src:'swf/player.swf', config: { provider:'swf/adaptiveProvider.swf', file:'ram/sessions/session' +session +'/stream.m3u8' } },

						{ type:'html5', config: { file:'ram/sessions/session' +session +'/stream.m3u8' } }

					]});



			return false;

		}

		prevmsg = message;

		status_Start(session,prevmsg);

	}