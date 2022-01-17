function() {

				var $container = $('<'+this.config.playerContainer+' />').css(this.config.playerStyles).addClass('player-container');

				if($.browser.msie){

					$container.addClass('player-container-ie player-container-ie-'+$.browser.version.substring(0, 1));

				}

				return $container;

			}