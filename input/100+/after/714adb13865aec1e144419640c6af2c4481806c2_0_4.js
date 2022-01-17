function(options) {

		// Array to Store AdUnits
		var adUnitArray = [];

		// Default DFP options
		var targetPaths = getTargetpaths();
		var dfpOptions = {
			'setTargeting':{
				'inURL':targetPaths,
				'URLIs':targetPaths[0],
				'Domain':window.location.host
			},
			'enableSingleRequest':true,
			'collapseEmptyDivs':'original'
		};

		// Make sure the default setTargetting is not lost in the object merge
		if(typeof options.setTargeting !== 'undefined' && typeof dfpOptions.setTargeting !== 'undefined') {
			options.setTargeting = $.extend(options.setTargeting, dfpOptions.setTargeting);
		}

		// Merge options objects
		dfpOptions = $.extend(dfpOptions, options);

		// Loops through on page Ad units and gets ads for them.
		$(dfpSelector).each(function() {

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

			// Store AdUnits
			adUnitArray.push(adUnitID);

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

				};

			});

		});

		// Push DFP config options
		window.googletag.cmd.push(function() {

			if(dfpOptions.enableSingleRequest === true) {
				window.googletag.pubads().enableSingleRequest();
			}
			$.each(dfpOptions.setTargeting, function(k,v) {
				window.googletag.pubads().setTargeting(k,v);
			});
			if(dfpOptions.collapseEmptyDivs === true || dfpOptions.collapseEmptyDivs === 'original') {
				window.googletag.pubads().collapseEmptyDivs();
			}
			window.googletag.enableServices();

		});

		// Display each ad
		$.each(adUnitArray, function(k,v) {

			window.googletag.cmd.push(function(){window.googletag.display(v);});

		});

	}