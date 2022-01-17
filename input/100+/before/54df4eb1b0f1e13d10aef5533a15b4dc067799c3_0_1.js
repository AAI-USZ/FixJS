function (e) {
        var $parent = $(this).closest('.genericStreamStory, .fbTimelineUnit, .UIStandardFrame_Content');

		// reset share object on every 'share' button click
		share = {};

		// find the name of the person that shared the attachment
		share.via = $('.passiveName, .actorName, .unitHeader, #fbPhotoPageAuthorName a', $parent).first().text();

		// find the message for this attachment, or if none use the attachment caption
		// .tlTxFe is used on new timeline
		share.text = $('.messageBody, .tlTxFe', $parent).first().text() || $('.caption', $parent).text();

		var thumb = $('.uiPhotoThumb img, .photoUnit img, .fbPhotoImage', $parent).attr('src');
		var url = $('.uiAttachmentTitle a, a.externalShareUnit', $parent).attr('href');

		// find picture status
		if( thumb ) {
			// convert the thumbnail link to a link to the fullsize image
			share.picture = thumb.replace(/[sp][0-9]+x[0-9]+\//, '');

			// we pass the source of the image for the 'found at' text
			share.url = $('a.uiPhotoThumb, a.photo', $parent).attr('href');

            // if sharing from an album, share.url will not be set, so
            // we grab the page url
            if( ! share.url ) {
                share.url = document.location.toString();
            }

			share.placement = 'facebook-share-picture';
		}

		// find link status
		else if (url) {
			if( url[0] == "/" ) url = "https://facebook.com" + url;
			share.url = url;
			share.placement = 'facebook-share-link';
		}
		
		// standard text status
		else
		{
			share.placement = 'facebook-share-status';
		}

    }