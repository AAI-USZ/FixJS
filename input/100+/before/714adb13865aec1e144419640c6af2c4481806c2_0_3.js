function() {

			var adUnit = this;

			count++;

			// adUnit name
			var adUnitName = getName(adUnit);

			// adUnit id - this will use an existing id or an auto generated one.
			var adUnitID = getID(adUnit,adUnitName,count);

			// get dimensions of the adUnit
			var dimensions = getDimensions(adUnit);

			// get existing content
			var $existingContent = $(adUnit).html();

			// wipe html clean ready for ad
			$(adUnit).html('');

			// Push commands to DFP to create ads
			window.googletag.cmd.push(function() {

				// Create the ad
				var googleAdUnit = window.googletag.defineSlot('/'+dfpID+'/'+adUnitName, [dimensions.width, dimensions.height], adUnitID).addService(window.googletag.pubads());

				// The following hijacks an internal google method to check if the div has been
				// collapsed after the ad has been attempted to be loaded.
				googleAdUnit.oldRenderEnded = googleAdUnit.renderEnded;
				googleAdUnit.renderEnded = function() {

					rendered++;

					var display = $(adUnit).css('display');

					// if the div has been collapsed but there was existing content expand the
					// div and reinsert the existing content.
					if(display === 'none' && $existingContent.trim().length > 0 && dfpOptions.collapseEmptyDivs === 'original') {
						$(adUnit).show().html($existingContent);
						display = 'original';
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

				};

				// Display the ad
				window.googletag.display(adUnitID);

			});

		}