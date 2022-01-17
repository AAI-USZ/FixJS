function() {

					rendered++;

					var display = $(adUnit).css('display');

					// if the div has been collapsed but there was existing content expand the
					// div and reinsert the existing content.
					if(display === 'none' && $existingContent.trim().length > 0 && dfpOptions.collapseEmptyDivs === 'original') {
						$(adUnit).show().html($existingContent);
						display = 'block display-original';
					}

					$(adUnit).addClass('display-'+display);

					googleAdUnit.oldRenderEnded();

					// Excute afterEachAdLoaded
					if(typeof dfpOptions.afterEachAdLoaded === 'function') {
						dfpOptions.afterEachAdLoaded.call(this,adUnit);
					}

					// Excute afterAllAdsLoaded
					if(typeof dfpOptions.afterAllAdsLoaded === 'function' && rendered === count) {
						dfpOptions.afterAllAdsLoaded.call(this,adUnit);
					}

				}