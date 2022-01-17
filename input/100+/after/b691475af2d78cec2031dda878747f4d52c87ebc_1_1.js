function(styleUrl, media){
			if(!media) media = 'all';

			// Don't double up on loading scripts
			if($.isItemLoaded(styleUrl)) return;

			if(document.createStyleSheet){
				var ss = document.createStyleSheet(styleUrl);
				ss.media = media;
				
			} else {
				var styleTag = document.createElement('link');
				$(styleTag).attr({
					href	: styleUrl,
					type	: 'text/css',
					media 	: media,
					rel		: 'stylesheet'
				}).appendTo($('head').get(0));
			}
			
			this._ondemand_loaded_list[styleUrl] = 1;

		}