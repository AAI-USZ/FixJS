function() {
					
					$rgGallery.find('div.rg-title').empty().append(title);
					$rgGallery.find('div.rg-caption').show().children('p').empty().text( description );
					$rgGallery.find('div.rg-image').empty().append('<img src="' + largesrc + '" />');
					$rgGallery.find('span.rg-score').empty().append('<code>'+rating+'/10</code>');
					$rgGallery.find('span.rg-stars').empty().raty({
						readOnly	: true,
						half  		: true,
						number      : 10,
						score		: rating
					});
					
					$rgGallery.find('div.rg-torrent').empty().append('<a href="'+torrent+'" target="_blank"> Download Torrent</a>');
					setYoutubeTrailer($rgGallery.find('div.rg-trailer').empty(), title);
					
					$loader.hide();
					
					if( mode === 'carousel' ) {
						$esCarousel.elastislide( 'reload' );
						$esCarousel.elastislide( 'setCurrent', current );
					}
					
					anim	= false;
					
				}