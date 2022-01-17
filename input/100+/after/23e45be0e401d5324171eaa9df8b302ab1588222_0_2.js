function(wgt) {
		var ads = wgt._autodisable, aded, uplder;
		if (ads) {
			ads = ads.split(',');
			for (var j = ads.length; j--;) {
				var ad = ads[j].trim();
				if (ad) {
					var perm;
					if (perm = ad.charAt(0) == '+')
						ad = ad.substring(1);
					ad = "self" == ad ? wgt: wgt.$f(ad);
					//B50-3304877: autodisable and Upload
					if (ad == wgt) { //backup uploader before disable
						uplder = wgt._uplder;
						wgt._uplder = null;
						wgt._autodisable_self = true;
					}
					if (ad && !ad._disabled) {
						// B60-ZK-1176: distinguish from other usages
						ad.setDisabled(true, {adbs: true});
						if (wgt.inServer)
							if (perm)
								ad.smartUpdate('disabled', true);
							else if (!aded) aded = [ad];
							else aded.push(ad);
					}
				}
			}
		}
		if (aded) {
			aded = new zul.wgt.ADBS(aded);
			if (uplder) {
				uplder._aded = aded;
				wgt._uplder = uplder;//zul.Upload.sendResult came on it.
			} else if (wgt.isListen('onClick', {asapOnly:true}))
				zWatch.listen({onResponse: aded});
			else
				setTimeout(function () {aded.onResponse();}, 800);
		}
	}