function () {
        m_chp.loadHiddenThings();

        for(var i=0, il=m_chp.hiddenThings.length; i < il; i++) {
            var thingId = m_chp.hiddenThings[i],
				// $hideLink = $('div.id-' + thingId + ':first > div.entry div.noncollapsed a.expand');
				// changed how this is grabbed and clicked due to firefox not working properly with it.
				$hideLink = document.querySelector('div.id-' + thingId + ' > div.entry div.noncollapsed a.expand');
            if ($hideLink) {
                /**
                 * Zero-length timeout to defer this action until after the
                 * other modules have finished. For some reason without
                 * deferring the hide was conflicting with the
                 * commentNavToggle width.
                **/
                (function ($hideLink) {
                    window.setTimeout(function () {
                        // $hideLink.click();
                        RESUtils.click($hideLink);
                    }, 0);
                })($hideLink)
            }
        }
    }